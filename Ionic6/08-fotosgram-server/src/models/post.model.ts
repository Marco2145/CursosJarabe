import { Schema, model, Document } from "mongoose";

const postSchema = new Schema({
	created: {
		type: Date,
	},
	message: {
		type: String,
	},
	// Un arreglo para permitir más de una imagen
	img: [
		{
			type: String,
		},
	],
	coords: {
		type: String, // lat, lng
	},
	user: {
		// Para hacer referencia a otro objeto de la BD
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Post must be linked to an existing user"],
	},
});

// Este trigger se hace antes de guardar
postSchema.pre<IPost>("save", function (next) {
	this.created = new Date();
	next();
});

// Para el tipado
export interface IPost extends Document {
	created: Date;
	message: string;
	img: string[];
	coords: string;
	user: string;
}

// El modelo ayuda a realizar conexiones, inserciones, etc con la base de datos
export const Post = model<IPost>("Post", postSchema);
