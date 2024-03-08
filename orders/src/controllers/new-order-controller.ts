import { Request, Response } from "express";
import { OrderModel, TicketModel } from "../models";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
} from "@ammarahmad/common";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const newOrderController = async (req: Request, res: Response) => {
  const { ticketId } = req.body;

  const ticket = await TicketModel.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  }

  const isReserved = await ticket.isReserved();

  if (isReserved) {
    throw new BadRequestError("Ticket is already reserved");
  }

  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  const order = OrderModel.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket,
  });

  await order.save();

  res.status(201).send(order);
};

export default newOrderController;
