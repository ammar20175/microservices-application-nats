import { Request, Response } from "express";
import { TicketModel } from "../models";
import { TicketCreatedPublisher } from "../events";
import natsWrapper from "../nats-wrapper";

const newTicketController = async (req: Request, res: Response) => {
  const { title, price } = req.body;

  const ticket = TicketModel.build({
    title,
    price,
    userId: req.currentUser!.id,
  });

  await ticket.save();
  new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version,
  });

  res.status(201).send(ticket);
};

export default newTicketController;
