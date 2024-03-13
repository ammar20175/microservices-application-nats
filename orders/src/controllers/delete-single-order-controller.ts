import { NotAuthorizedError, NotFoundError } from "@ammarahmad/common";
import { Request, Response } from "express";
import { OrderModel } from "../models";
import { OrderStatus } from "../models/order-model";
import { OrderCancelledPublisher } from "../events";
import natsWrapper from "../nats-wrapper";

const deleteSingleOrderController = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await OrderModel.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order);
};

export default deleteSingleOrderController;
