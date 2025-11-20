import { Router, type Response } from "express";

import { verifyToken } from "../middlewares/authentication.js";
import { Post } from "../models/post.model.js";
import type { IFileUpload } from "../interfaces/file-upload.interface.js";
import FileSystem from "../classes/file-system.js";

const postRoutes = Router();
const fileSystem = new FileSystem();

// Get Posts
postRoutes.get("/", async (request: any, response: Response) => {
	let page = Number(request.query.page) || 1;
	if (page < 0) page = 1;
	// When page = 1, it'll skip 0 elements, page 2 is 10 elements, and so on...
	let skip = (page - 1) * 10;

	// Sort by id: descending - limit to 10 results - skip x results
	const postsDB = await Post.find()
		.sort({ _id: -1 })
		.limit(10)
		.skip(skip)
		.populate("user", "-password");

	response.status(200).json({
		ok: true,
		page,
		postsDB,
	});
});

// Create Post
postRoutes.post("/", [verifyToken], (request: any, response: Response) => {
	if (request.body) {
		const body = request.body;

		body.user = request.user._id;

		Post.create(body)
			.then(async (postDB) => {
				// Para tener el usuario con sus datos (excepto la contraseña), y no solo su ID
				await postDB.populate("user", "-password");

				response.status(200).json({
					ok: true,
					post: postDB,
				});
			})
			.catch((err) => {
				if (err) console.log("Catched error: ", err);
				response.status(400).json({ ok: false, error: err });
			});
	}
});

// Service for uploading files
postRoutes.post(
	"/upload",
	[verifyToken],
	(request: any, response: Response) => {
		if (!request.files) {
			response.status(400).json({ ok: false, error: "No file attached" });
			return;
		}

		const file: IFileUpload = request.files.image;

		// * Safety could be improved by doing additional checks against malicious files that pose as images
		if (!file || !file.mimetype.includes("image")) {
			response
				.status(400)
				.json({ ok: false, error: "No image file attached" });
			return;
		}

		fileSystem.saveTempImg(file, request.user._id);

		response.status(200).json({ ok: true, type: file.mimetype });
	}
);

export default postRoutes;
