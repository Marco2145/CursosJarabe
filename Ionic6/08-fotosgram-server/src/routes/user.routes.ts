import { Router, type Request, type Response } from "express";
import { User } from "../models/user.model.js";

import bcrypt from "bcrypt";
import Token from "../classes/token.js";
import { verifyToken } from "../middlewares/authentication.js";

const userRoutes = Router();

// TODO: Would be a good idea to separate the logic here to avoid boilerplate

// ? Login
// ! REMOVE *asteriscs* FROM ERROR MESSAGES when in PROD
userRoutes.post("/login", async (request: Request, response: Response) => {
	if (request.body) {
		const userDB = await User.findOne({ email: request.body.email });

		if (!userDB) {
			response
				.status(200)
				.json({ ok: false, error: "incorrect *user* or password" });
		}

		if (userDB?.comparePassword(request.body.password)) {
			const userToken = Token.getJwtToken({
				_id: userDB._id,
				name: userDB.name,
				email: userDB.email,
				avatar: userDB.avatar,
			});

			response.status(200).json({
				ok: true,
				token: userToken,
			});
		} else {
			response
				.status(200)
				.json({ ok: false, error: "incorrect user or *password*" });
		}
	} else {
		response
			.status(400)
			.json({ ok: false, error: "missing form url encoded body" });
	}
});

// ? Signup - Crear un usuario
userRoutes.post("/create", (request: Request, response: Response) => {
	if (request.body) {
		const user = {
			name: request.body.name,
			email: request.body.email,
			password: bcrypt.hashSync(request.body.password, 10),
			avatar: request.body.avatar,
		};

		User.create(user)
			.then((userDB) => {
				const userToken = Token.getJwtToken({
					_id: userDB._id,
					name: userDB.name,
					email: userDB.email,
					avatar: userDB.avatar,
				});

				response.status(200).json({
					ok: true,
					token: userToken,
				});
			})
			.catch((err) => {
				if (err) console.log("Catched error: ", err);
				response.status(400).json({ ok: false, error: err });
			});
	} else {
		response
			.status(400)
			.json({ ok: false, error: "missing form url encoded body" });
	}
});

// ? Update user
userRoutes.post(
	"/update",
	[verifyToken],
	async (request: any, response: Response) => {
		const user = {
			name: request.body.name || request.user.name,
			email: request.body.email || request.user.email,
			avatar: request.body.avatar || request.user.avatar,
		};

		// console.log({
		// 	reqBodyFromForm: request.body,
		// 	reqUserFromToken: request.user,
		// });

		// ! Importante cambio, esta función regresaba el valor anterior en newUserDB,
		// * Se realiza un cambio en opciones para que sea el usuario DESPUES de insertar con Return Document en after
		// https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
		const newUserDB = await User.findByIdAndUpdate(request.user._id, user, {
			returnDocument: "after",
		});

		// console.log({ received: user, created: newUserDB });

		if (!newUserDB) {
			response.status(200).json({
				ok: false,
				error: "No user exist with the provided ID",
			});
		} else {
			const userToken = Token.getJwtToken({
				_id: newUserDB?._id,
				name: newUserDB?.name,
				email: newUserDB?.email,
				avatar: newUserDB?.avatar,
			});

			response.status(200).json({
				ok: true,
				token: userToken,
			});

			console.log(`new token for ${newUserDB}`, userToken);
		}
	}
);

// ? get user by token
userRoutes.get("/", [verifyToken], (request: any, response: Response) => {
	const user = request.user;
	response.status(200).json({
		ok: true,
		user,
	});
});

export default userRoutes;
