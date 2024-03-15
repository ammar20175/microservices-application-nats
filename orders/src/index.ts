import mongoose from "mongoose";
import app from "./app";
import natsWrapper from "./nats-wrapper";
import {
  TicketCreatedListener,
  TicketUpdatedListener,
  ExpirationCompleteListener,
  PaymentCreatedListener,
} from "./events";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT KEY IS NOT DEFINED");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI IS NOT DEFINED");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error(" NATS CLIENT ID IS NOT DEFINED");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS URL IS NOT DEFINED");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS CLUSTER ID IS NOT DEFINED");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Orders database connected");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
