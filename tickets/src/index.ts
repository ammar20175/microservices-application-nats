import mongoose from "mongoose";
import app from "./app";

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error("JWT KEY IS NOT DEFINED");
	}

	if (!process.env.MONGO_URI) {
		throw new Error("MONGO URI IS NOT DEFINED");
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Tickets database connected");
	} catch (error) {
		console.log(error);
	}

	app.listen(3000, () => {
		console.log("Listening on port 3000!");
	});
};

start();
