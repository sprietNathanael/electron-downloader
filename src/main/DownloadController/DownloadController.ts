import * as fs from 'fs';
import http from 'http';
import https from 'https';
import { v4 as uuid } from 'uuid';
import DownloadEntry from '../../Common/DownloadEntry';
// import { DownloadControlAPI, DownloadInfo } from '../IPC/Apis/DownloadControlAPI';
import { DownloadControlAPI } from '../IPC/Apis/DownloadControlAPI';

export default class DownloadController {
	registeredDownloads: DownloadEntry[];
	downloadAPI: DownloadControlAPI;
	httpResponses: Map<string, http.IncomingMessage>;
	constructor(downloadAPI: DownloadControlAPI) {
		this.registeredDownloads = [];
		this.httpResponses = new Map();
		this.downloadAPI = downloadAPI;
		downloadAPI
			.on('beginDownload', async (message) => {
				let newEntry = this.registerDownload(message.url, message.localPath);
				this.getDownloadInfo(newEntry).then(() => this.downloadFile(newEntry));
			})
			.on('pauseDownload', async (message) => {
				let entry = this.registeredDownloads.find((el) => el.uuid === message);
				if (entry) {
					this.httpResponses.get(entry.uuid).destroy();
					this.httpResponses.delete(entry.uuid);
					entry.status = 'paused';
					this.downloadAPI.sendToRender('downloadInfoUpdate', entry);
				}
			})
			.on('resumeDownload', async (message) => {
				console.log('???????????????????');
				let entry = this.registeredDownloads.find((el) => el.uuid === message);
				if (entry) {
					this.downloadFile(entry);
				}
			});
	}

	registerDownload(url: string, localPath: string) {
		let newUuid = uuid();
		let newDownloadEntry = new DownloadEntry(newUuid, url, localPath);
		this.registeredDownloads.push(newDownloadEntry);
		this.downloadAPI.sendToRender('downloadRegistered', newDownloadEntry);
		return newDownloadEntry;
	}

	getDownloadInfo(download: DownloadEntry) {
		let requestOptions = {
			host: download.url.host,
			path: download.url.pathname,
			port: download.url.port,
			method: 'HEAD',
		};
		let protocol = download.url.protocol;
		return this.makeRequest(protocol, requestOptions)
			.then((res: http.IncomingMessage) => {
				download.size = parseInt(res.headers['content-length']);
				this.downloadAPI.sendToRender('downloadInfoUpdate', download);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	downloadFile(download: DownloadEntry) {
		let byteBegin = 0;
		if (fs.existsSync(download.localPath)) {
			byteBegin = fs.statSync(download.localPath).size;
		}
		let fileWriteStream = fs.createWriteStream(download.localPath, { flags: 'a' });
		let requestOptions = {
			host: download.url.host,
			path: download.url.pathname,
			port: download.url.port,
			method: 'GET',
			headers: {
				Range: `bytes=${byteBegin}-`,
			},
		};

		let protocol = download.url.protocol;
		this.makeRequest(protocol, requestOptions)
			.then((response: http.IncomingMessage) => {
				let downloadSize = byteBegin;
				download.progress = downloadSize;
				download.downloadStartAt = new Date();
				download.lastUpdateAt = new Date();
				download.status = 'ongoing';
				this.httpResponses.set(download.uuid, response);
				this.downloadAPI.sendToRender('downloadInfoUpdate', download);
				if (response.statusCode !== 416) {
					response.on('data', (data) => {
						downloadSize += data.length;
						fileWriteStream.write(data);
						download.progress = downloadSize;
						download.lastUpdateAt = new Date();
						this.downloadAPI.sendToRender('downloadInfoUpdate', download);
					});

					response.on('error', (err) => {
						console.log('!!!!!!');
						console.log(err);
					});

					response.on('end', () => {
						download.status = 'finished';
						this.downloadAPI.sendToRender('downloadFinished', download);
						fileWriteStream.end();
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	makeRequest(protocol: string, options: http.RequestOptions | https.RequestOptions) {
		return new Promise((resolve, reject) => {
			let request: http.ClientRequest;
			if (protocol === 'http:') {
				request = http.request(options, (response) => {
					resolve(response);
				});
			} else {
				request = https.request(options, (response) => {
					resolve(response);
				});
			}
			request.on('error', (error) => {
				reject(error);
			});

			request.end();
		});
	}
}
