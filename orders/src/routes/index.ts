import epxress from "express";
import { body } from "express-validator";
import {
	currentUserMiddleware,
	validateRequestMiddleware,
	requireAuthMiddleware,
} from "@ammarahmad/common";

const ordersRouter = epxress.Router();

ordersRouter.post("/api/orders");

ordersRouter.get("/api/orders");

ordersRouter.get("/api/orders/:id");

ordersRouter.put("/api/orders/:id");
export default ordersRouter;
