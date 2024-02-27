import { Request, Response } from "express";
import { TicketModel } from "../models";
import { NotAuthorizedError, NotFoundError } from "@ammarahmad/common";

const updateSingleTicketController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, price } = req.body;
	const ticket = await TicketModel.findById(id);

	if (!ticket) {
		throw new NotFoundError();
	}

	if (ticket.userId !== req.currentUser!.id) {
		throw new NotAuthorizedError();
	}

	ticket.set({
		title,
		price,
	});

	await ticket.save();

	res.send(ticket);
};

export default updateSingleTicketController;
