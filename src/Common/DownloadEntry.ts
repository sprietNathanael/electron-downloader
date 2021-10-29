export default class DownloadEntry {
	uuid: string;
	url: URL;
	localPath: string;
	progress: number;
	size: number;
	downloadStartAt: Date;
	lastUpdateAt: Date;
	status: 'initialized' | 'ongoing' | 'paused' | 'finished';

	constructor(uuid: string, url: string, localPath: string) {
		this.uuid = uuid;
		this.url = new URL(url);
		this.localPath = localPath;
		this.progress = 0;
		this.size = 0;
		this.status = 'initialized';
	}
}
