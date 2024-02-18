import { Request, Response } from "express";

const signOutController = (req: Request, res: Response) => {
	req.session = null;

	res.send({});
};

export default signOutController;
