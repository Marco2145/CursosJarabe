import type { IFileUpload } from "../interfaces/file-upload.interface.js";

import path from "path";
import fs from "fs";

// If you are using Node.js modules, __dirname and __filename don't exist.
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class FileSystem {
	saveTempImg(file: IFileUpload, userId: string) {
		const path = this._createUserFolder(userId);
		console.log(path);
	}

	private _createUserFolder(userId: string) {
		const pathUser = path.resolve(__dirname, "../uploads", userId);
		const PathUserTmp = pathUser + "/tmp";

		const exists = fs.existsSync(pathUser);

		// Create directory
		if (!exists) {
			fs.mkdirSync(pathUser);
			fs.mkdirSync(PathUserTmp);
		}

		return PathUserTmp;
	}
}
