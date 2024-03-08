import { Request, Response } from "express";
import { OrderModel } from "../models";
import { NotAuthorizedError, NotFoundError } from "@ammarahmad/common";

const showSingleOrderController = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await OrderModel.findById(orderId).populate("ticket");

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  res.send(order);
};

export default showSingleOrderController;
