import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "@ammarahmad/common";
import { PasswordService } from "../services";
import { UserModel } from "../models";

const signInController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const existingUser = await UserModel.findOne({ email });
	if (!existingUser) {
		throw new BadRequestError("Invalid credentials");
	}

	const passwordsMatch = await PasswordService.compare(
		existingUser.password,
		password
	);

	if (!passwordsMatch) {
		throw new BadRequestError("Invalid Credentials");
	}

	const userJwt = jwt.sign(
		{
			id: existingUser.id,
			email: existingUser.email,
		},
		process.env.JWT_KEY!
	);

	req.session = {
		jwt: userJwt,
	};

	res.status(200).send(existingUser);
};

export default signInController;
