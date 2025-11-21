import type { IFileUpload } from "../interfaces/file-upload.interface.js";

import path from "path";
import fs from "fs";
import uniqid from "uniqid";

// If you are using Node.js modules, __dirname and __filename don't exist.
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class FileSystem {
	async saveTempImg(file: IFileUpload, userId: string) {
		// * Create directory and get path
		const path = this._createUserDir(userId);
		// console.log(path);

		// * Generate filename
		const filename = this._createUniqueFilename(file.name);
		// console.log(file.name);
		// console.log(filename);

		// * Move the file to the tmp folder

		await file.mv(`${path}/${filename}`);
	}

	public mvFromTmpToPostDir(userId: string): string[] {
		const pathTmp = path.resolve(__dirname, "../uploads", userId, "tmp");
		const pathPost = path.resolve(__dirname, "../uploads", userId, "posts");

		// If there are no files to upload, return
		if (!fs.existsSync(pathTmp)) {
			return [];
		}

		// If the user's posts folder doesn't exist, create it
		if (!fs.existsSync(pathPost)) {
			fs.mkdirSync(pathPost);
		}

		const tmpImgs = this._getImgsFromTmpDir(userId);
		tmpImgs.forEach((img) => {
			// When we rename it, we can move it somewhere else
			fs.renameSync(`${pathTmp}/${img}`, `${pathPost}/${img}`);
		});

		return tmpImgs;
	}

	/**
	 *
	 * @param userId: the user's unique ID
	 * @param imgName: the image's unique name
	 * @returns The image's URL
	 */
	getImgUrl(
		userId: string,
		imgName: string
	): { path: string; exists: boolean } {
		let result = {
			path: "",
			exists: false,
		};

		result.path = path.resolve(
			__dirname,
			"../uploads",
			userId,
			"posts",
			imgName
		);

		result.exists = fs.existsSync(result.path);

		// Not found - url
		if (!result.exists)
			result.path = path.resolve(
				__dirname,
				"../assets",
				"broken-link.png"
			);

		return result;
	}

	/**
	 * Gets all the image namefiles from the user's temp directory
	 *
	 * @param userId: the user's ID
	 */
	private _getImgsFromTmpDir(userId: string): string[] {
		const pathTmp = path.resolve(__dirname, "../uploads", userId, "tmp");

		return fs.readdirSync(pathTmp) ?? [];
	}

	/**
	 * Creates a directory for storing the user's images
	 *
	 * @param userId
	 * @returns The user's temporary directory path
	 */
	private _createUserDir(userId: string): string {
		const pathUser = path.resolve(__dirname, "../uploads", userId);

		const PathUserTmp = pathUser + "/tmp";

		const exists = fs.existsSync(pathUser);

		// If it doesn't exist, then we create the directory
		if (!exists) {
			fs.mkdirSync(pathUser);
			fs.mkdirSync(PathUserTmp);
		}

		return PathUserTmp;
	}

	/**
	 * Generates a unique filename for the given original filename
	 * @param originalFilename
	 * @returns unique filename
	 */
	private _createUniqueFilename(originalFilename: string): string {
		// Get filename extension
		const nameArr = originalFilename.split(".");
		const fileExt = nameArr[nameArr.length - 1];

		const uniqueId = uniqid();

		return `${uniqueId}.${fileExt}`;
	}
}
