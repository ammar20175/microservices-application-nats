import epxress from "express";
import { body, param } from "express-validator";
import {
  currentUserMiddleware,
  validateRequestMiddleware,
  requireAuthMiddleware,
} from "@ammarahmad/common";
import { newChargeController } from "../controllers";
import mongoose from "mongoose";

const paymentsRouter = epxress.Router();

paymentsRouter.post(
  "/api/payments",
  requireAuthMiddleware,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequestMiddleware,
  newChargeController
);

export default paymentsRouter;
