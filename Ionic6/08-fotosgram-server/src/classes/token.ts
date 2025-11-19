import jwt from "jsonwebtoken";
import { type StringValue } from "ms";

export default class Token {
	private static _secretKey: string =
		"seed-de-mi-app-secreto-Ubc0vzE2m:FZ=3>Ys/?1;4tM+b,t07";
	private static _expiration: StringValue = "30d";

	static getJwtToken(payload: any): string {
		const token = jwt.sign({ user: payload }, this._secretKey, {
			expiresIn: this._expiration,
		});

		return token;
	}

	static verifyToken(userToken: string) {
		return new Promise((resolve, reject) => {
			jwt.verify(userToken, this._secretKey, (err, decoded) => {
				if (err) {
					// No confiar
					reject();
				} else {
					// Token valido
					resolve(decoded);
				}
			});
		});
	}
}
