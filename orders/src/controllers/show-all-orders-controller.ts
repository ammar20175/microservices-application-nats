import { Request, Response } from "express";
import { OrderModel } from "../models";

const showAllOrdersController = async (req: Request, res: Response) => {
  const orders = await OrderModel.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(orders);
};

export default showAllOrdersController;
