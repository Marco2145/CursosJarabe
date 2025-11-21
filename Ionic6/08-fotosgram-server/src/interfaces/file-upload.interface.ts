export interface IFileUpload {
	name: string;
	data: any;
	size: number;
	encoding: String;
	tempFilePath: String;
	truncated: boolean;
	mimetype: String;
	md5: String;

	// Propio del express file
	mv(path: string, callback: (err: any) => void): void;
	mv(path: string): Promise<void>;
}
