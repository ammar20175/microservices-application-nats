import epxress from "express";
import { body, param } from "express-validator";
import {
  currentUserMiddleware,
  validateRequestMiddleware,
  requireAuthMiddleware,
} from "@ammarahmad/common";
import {
  deleteSingleOrderController,
  newOrderController,
  showAllOrdersController,
  showSingleOrderController,
} from "../controllers";
import mongoose from "mongoose";

const ordersRouter = epxress.Router();

ordersRouter.post(
  "/api/orders",
  requireAuthMiddleware,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequestMiddleware,
  newOrderController
);

ordersRouter.get("/api/orders", requireAuthMiddleware, showAllOrdersController);

ordersRouter.get(
  "/api/orders/:orderId",
  requireAuthMiddleware,
  [
    param("orderId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("OrderId must be provided"),
  ],
  validateRequestMiddleware,
  showSingleOrderController
);

ordersRouter.delete(
  "/api/orders/:orderId",
  requireAuthMiddleware,
  [
    param("orderId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("OrderId must be provided"),
  ],
  validateRequestMiddleware,
  deleteSingleOrderController
);

export default ordersRouter;
