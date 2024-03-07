import epxress from "express";
import { body } from "express-validator";
import {
	currentUserMiddleware,
	validateRequestMiddleware,
	requireAuthMiddleware,
} from "@ammarahmad/common";
import {
	deleteSingleOrderController,
	newOrderController,
	showMultipleOrdersController,
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

ordersRouter.get("/api/orders", showMultipleOrdersController);

ordersRouter.get("/api/orders/:orderId", showSingleOrderController);

ordersRouter.delete("/api/orders/:orderId", deleteSingleOrderController);

export default ordersRouter;
