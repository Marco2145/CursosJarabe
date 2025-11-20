export interface IFileUpload {
	name: string;
	data: any;
	size: number;
	encoding: String;
	tempFilePath: String;
	truncated: boolean;
	mimetype: String;
	md5: String;
}
