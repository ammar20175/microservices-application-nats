import { Request, Response } from "express";

const newTicketController = (req: Request, res: Response) => {
	res.sendStatus(200);
};

export default newTicketController;
