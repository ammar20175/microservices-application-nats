import { Request, NextFunction, Response } from "express";
import { CustomError } from "../errors";

const errorHandlerMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}

	res.status(400).send({ message: err.message });
};

export default errorHandlerMiddleware;
