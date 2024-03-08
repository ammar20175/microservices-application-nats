import { Request, Response } from "express";
import { TicketModel } from "../models";

const showAllTicketController = async (req: Request, res: Response) => {
  const tickets = await TicketModel.find({});

  res.send(tickets);
};

export default showAllTicketController;
