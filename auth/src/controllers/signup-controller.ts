import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors";

const signUpController = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array());
	}

	const { email, password } = req.body;

	console.log(email, password);

	res.status(200).send({});
};

export default signUpController;
