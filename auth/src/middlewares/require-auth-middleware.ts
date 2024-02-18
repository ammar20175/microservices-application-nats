import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors";

const requireAuthMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.currentUser) {
		throw new NotAuthorizedError();
	}

	next();
};

export default requireAuthMiddleware;
