// import { IPCApi, ReturnParameter } from '../IPCApi';
// // import { IPCApi, ReturnParameter } from '../IPCApi';
// type DownloadInfo = {
// 	url: string;
// 	localPath: string;
// };
import DownloadEntry from '../../../Common/DownloadEntry';
// import { IPCApi, ReturnParameter } from '/main/IPC/IPCApi';
import { IPCApi } from '../IPCApi';

const apiName = 'downloadControl';

// ====================== This is the renderer side
// to Main
const validSendChannels = ['beginDownload', 'pauseDownload', 'resumeDownload'];

// from Main
const validReceiveChannels = ['downloadRegistered', 'downloadInfoUpdate', 'downloadProgressUpdate', 'donwloadFinished'];
type DownloadEventFromFront = {
	beginDownload: { url: string; localPath: string };
	pauseDownload: string;
	resumeDownload: string;
};

type DownloadEventToFront = {
	downloadRegistered: DownloadEntry;
	downloadProgressUpdate: DownloadEntry;
	downloadInfoUpdate: DownloadEntry;
	downloadFinished: DownloadEntry;
};

class DownloadControlAPI extends IPCApi<DownloadEventFromFront, DownloadEventToFront> {
	private static instance: DownloadControlAPI;
	private constructor() {
		super(apiName, validSendChannels, validReceiveChannels);
	}
	public static getInstance(): DownloadControlAPI {
		if (!DownloadControlAPI.instance) {
			DownloadControlAPI.instance = new DownloadControlAPI();
		}

		return DownloadControlAPI.instance;
	}
}
export { DownloadControlAPI, DownloadEventToFront, DownloadEventFromFront };
export default DownloadControlAPI.getInstance();
