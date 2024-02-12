import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import authRouter from "./routes";
import { errorHandlerMiddleware } from "./middlewares";
import { NotFoundError } from "./errors";

const app = express();
app.use(json());

app.get("/api/users", (req, res) => {
	res.status(200).json("hello");
});
app.use(authRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
		console.log("Auth database connected");
	} catch (error) {
		console.log(error);
	}

	app.listen(3000, () => {
		console.log("Listening on port 3000!");
	});
};

start();
