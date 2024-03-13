import { Request, Response } from "express";
import { TicketModel } from "../models";
import { NotAuthorizedError, NotFoundError } from "@ammarahmad/common";
import natsWrapper from "../nats-wrapper";
import { TicketUpdatedPublisher } from "../events";

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

  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version,
  });

  res.send(ticket);
};

export default updateSingleTicketController;
