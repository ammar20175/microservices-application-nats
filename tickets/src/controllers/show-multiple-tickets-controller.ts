import { Request, Response } from "express";
import { TicketModel } from "../models";

const showMultipleTicketController = async (req: Request, res: Response) => {
	const tickets = await TicketModel.find({});

	res.send(tickets);
};

export default showMultipleTicketController;
