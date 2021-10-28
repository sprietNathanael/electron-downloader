import { DownloadControlAPI } from '../IPC/Apis/DownloadControlAPI';

export default class DownloadController {
	onGoingDownload: Array<String>;
	constructor(downloadAPI: DownloadControlAPI) {
		this.onGoingDownload = [];
		// downloadAPI.on('beginDownload', (mainWindow, event, message) => {
		// 	console.log();
		// })
		// downloadAPI.on('beginDownload', () => {
		// 	console.log('????');
		// });
		downloadAPI.on('beginDownload', async ({ mainWindow, event, message }) => {
			console.log(`URL to download : ${message}`);
			for (let i = 0; i < 10; i++) {
				await new Promise((resolve) => {
					downloadAPI.sendToRender(mainWindow, 'downloadProgress', { url: message, progress: i * 10 });
					setTimeout(resolve, 1000);
				});
			}
		});
	}
}
