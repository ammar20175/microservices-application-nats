import { Request, Response } from "express";
import { TicketModel } from "../models";
import { TicketCreatedPublisher } from "../events";

const newTicketController = async (req: Request, res: Response) => {
	const { title, price } = req.body;

	const ticket = TicketModel.build({
		title,
		price,
		userId: req.currentUser!.id,
	});

	await ticket.save();
	// new TicketCreatedPublisher(client).publish({
	// 	id: ticket.id,
	// 	title: ticket.title,
	// 	price: ticket.price,
	// 	userId: ticket.userId,
	// });
	res.status(201).send(ticket);
};

export default newTicketController;
