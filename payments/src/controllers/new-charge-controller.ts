import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@ammarahmad/common";
import { Request, Response } from "express";
import stripe from "../stripe";
import { OrderModel, PaymentModel } from "../models";
import { PaymentCreatedPublisher } from "../events";
import natsWrapper from "../nats-wrapper";

const newChargeController = async (req: Request, res: Response) => {
  const { token, orderId } = req.body;

  const order = await OrderModel.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  if (order.status === OrderStatus.Cancelled) {
    throw new BadRequestError("Cannot pay for an cancelled order");
  }

  const charge = await stripe.charges.create({
    currency: "usd",
    amount: order.price * 100,
    source: token,
  });

  const payment = PaymentModel.build({
    orderId,
    stripeId: charge.id,
  });

  await payment.save();

  new PaymentCreatedPublisher(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.orderId,
    stripeId: payment.stripeId,
  });

  res.status(201).send({ id: payment.id });
};

export default newChargeController;
