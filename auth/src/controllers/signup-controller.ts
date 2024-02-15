import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError, RequestValidationError } from "../errors";
import { User } from "../models";
import jwt from "jsonwebtoken";

const signUpController = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array());
	}

	const { email, password } = req.body;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new BadRequestError("Email in use.");
	}

	const user = User.build({
		email,
		password,
	});

	await user.save();

	const userJwt = jwt.sign(
		{
			id: user.id,
			email: user.email,
		},
		process.env.JWT_KEY!
	);

	req.session = {
		jwt: userJwt,
	};

	res.status(200).send(user);
};

export default signUpController;
