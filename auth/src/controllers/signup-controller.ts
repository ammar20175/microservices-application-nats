import { Request, Response } from "express";
import { BadRequestError } from "@ammarahmad/common";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";

const signUpController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const existingUser = await UserModel.findOne({ email });

	if (existingUser) {
		throw new BadRequestError("Email in use");
	}

	const user = UserModel.build({ email, password });
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

	res.status(201).send(user);
};

export default signUpController;
