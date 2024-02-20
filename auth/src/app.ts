import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import authRouter from "./routes";
import { errorHandlerMiddleware } from "./middlewares";
import { NotFoundError } from "./errors";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
	cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.get("/api/users", (req, res) => {
	res.status(200).json("hello");
});

app.use(authRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

export default app;
