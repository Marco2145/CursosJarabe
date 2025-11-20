import { Server } from "./classes/server.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

const server = new Server();

// Tomar info del posteo y cambiarlo a obj de Javascript
// ? bodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Definirle una ruta en particular
// Decirle que esté pendiente del path user, y que cuando alguien haga peticion a user, usar el user route
// ? Rutas de mi app
server.app.use("/user", userRoutes);
server.app.use("/posts", postRoutes);

// ? Conectar DB
mongoose
	.connect("mongodb://localhost:27017/fotosgram")
	.then(() => {
		console.log("## DB is Online! ");
	})
	.catch((err) => {
		if (err) throw err;
	});

// ? Levantar express
server.start(() => {
	console.log(`Server running on port ${server.port}`);
});
