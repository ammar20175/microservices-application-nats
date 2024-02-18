import epxress from "express";
import {
	currentUserController,
	signInController,
	signUpController,
	signOutController,
} from "../controllers";
import { body } from "express-validator";
import {
	currentUserMiddleware,
	validateRequestMiddleware,
} from "../middlewares";
const authRouter = epxress.Router();

authRouter.get(
	"/api/users/currentuser",
	currentUserMiddleware,
	currentUserController
);

authRouter.post(
	"/api/users/signup",
	[
		body("email").isEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 characters."),
	],
	validateRequestMiddleware,
	signUpController
);
authRouter.post(
	"/api/users/signin",
	[
		body("email").isEmail().withMessage("Email must be valid"),
		body("password").trim().notEmpty().withMessage("Password required."),
	],
	validateRequestMiddleware,
	signInController
);
authRouter.post("/api/users/signout", signOutController);

export default authRouter;
