import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

// el modelo tiene los campos que yo voy a insertar,
// ie password:string, nombre:string, etc

const userSchema = new Schema({
	// Campos
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	avatar: {
		type: String,
		default: "av-1.png",
	},
	email: {
		type: String,
		unique: true,
		required: [true, "Email is required"],
	},
	password: {
		type: String,
		required: [true, "Passsword is required"],
	},
});

userSchema.method(
	"comparePassword",
	function (password2: string = ""): boolean {
		return bcrypt.compareSync(password2, this.password);
	}
);

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	avatar: string;

	comparePassword(password: string): boolean;
}

// El modelo ayuda a realizar conexiones, inserciones, etc con la base de datos
export const User = model<IUser>("User", userSchema);
