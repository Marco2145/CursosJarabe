import type { Response, Request, NextFunction } from "express";
import Token from "../classes/token.js";

export const verifyToken = (
	request: any,
	response: Response,
	next: NextFunction
) => {
	const userToken = request.get("x-token") || "";

	Token.verifyToken(userToken)
		.then((decoded: any) => {
			// console.log(decoded);
			request.user = decoded.user;
			next();
		})
		.catch((err) => {
			response.status(400).json({
				ok: false,
				error: "invalid token",
			});
		});
};
