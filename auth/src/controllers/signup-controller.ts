import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError, RequestValidationError } from "../errors";
import { User } from "../models";

const signUpController = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array());
	}

	const { email, password } = req.body;
	console.log(email, password);
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new BadRequestError("Email in use.");
	}

	const user = User.build({
		email,
		password,
	});

	const su = await user.save();
	console.log(su);

	res.status(200).send({});
};

export default signUpController;
