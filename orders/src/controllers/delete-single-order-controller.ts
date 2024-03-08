import { NotAuthorizedError, NotFoundError } from "@ammarahmad/common";
import { Request, Response } from "express";
import { OrderModel } from "../models";
import { OrderStatus } from "../models/order-model";

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

  res.status(204).send(order);
};

export default deleteSingleOrderController;
