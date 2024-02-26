import { Request, Response } from "express";
import { TicketModel } from "../models";

const newTicketController = async (req: Request, res: Response) => {
	const { title, price } = req.body;

	const ticket = TicketModel.build({
		title,
		price,
		userId: req.currentUser!.id,
	});

	await ticket.save();

	res.status(201).send(ticket);
};

export default newTicketController;
