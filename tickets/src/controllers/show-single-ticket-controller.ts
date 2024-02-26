import { Request, Response } from "express";
import { TicketModel } from "../models";
import { NotFoundError } from "@ammarahmad/common";

const showSingleTicketController = async (req: Request, res: Response) => {
	const { id } = req.params;

	const ticket = await TicketModel.findById(id);

	if (!ticket) {
		throw new NotFoundError();
	}

	res.send(ticket);
};

export default showSingleTicketController;
