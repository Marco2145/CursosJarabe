import { Router, type Response } from "express";

import { verifyToken } from "../middlewares/authentication.js";
import { Post } from "../models/post.model.js";
import type { IFileUpload } from "../interfaces/file-upload.interface.js";
import FileSystem from "../classes/file-system.js";

const postRoutes = Router();
const fileSystem = new FileSystem();

// ? Get Posts
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

// ? Create Post
postRoutes.post("/", [verifyToken], (request: any, response: Response) => {
	if (request.body) {
		const body = request.body;
		// append user (ID) to body
		body.user = request.user._id;

		const images = fileSystem.mvFromTmpToPostDir(request.user._id);

		// append imgs to body
		body.imgs = images;

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

// ? Service for uploading files
postRoutes.post(
	"/upload",
	[verifyToken],
	async (request: any, response: Response) => {
		console.log("request.files", request.files);

		if (!request.files) {
			response.status(400).json({ ok: false, error: "No file attached" });
			return;
		}

		const file: IFileUpload = request.files.image;

		// * Safety could be improved by doing additional checks against malicious files that pose as images
		if (!file || !file.mimetype.includes("image")) {
			console.log("did not include image");

			response
				.status(400)
				.json({ ok: false, error: "No image file attached" });
			return;
		}

		// Save the file in the tmp path
		await fileSystem.saveTempImg(file, request.user._id);

		response.status(200).json({ ok: true, type: file.mimetype });
	}
);

// ? Service for getting image URLs
postRoutes.get("/image/:userId/:img", (request: any, response: Response) => {
	// Get the params values
	const userId = request.params.userId;
	const imgName = request.params.img;

	// Get the img path and if it exists
	const img = fileSystem.getImgUrl(userId, imgName);
	// response.status(200).json({ ok: true, imgPath });

	if (img.exists) {
		response.status(200).sendFile(img.path);
		return;
	}

	response.status(404).sendFile(img.path);
});

export default postRoutes;
