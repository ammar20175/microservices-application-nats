import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import authRouter from "./routes";
import { errorHandlerMiddleware } from "./middlewares";
import { NotFoundError } from "./errors";

const app = express();
app.use(json());

app.use(authRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
	console.log("Listening on port 3000!");
});
