import { EventKey } from '../../../utils/EventEmitter';
// import { IPCApi, ReturnParameter } from '../IPCApi';
import { IPCApi, ReturnParameter } from '../IPCApi';

const apiName = 'downloadControl';

// ====================== This is the renderer side
// to Main
const validSendChannels = { beginDownload: '' };

// from Main
// const validReceiveChannels = ['downloadProgress'] as const;
const validReceiveChannels = { downloadProgress: { url: '', progress: 0 } };
type DownloadEventFromFront = typeof validSendChannels;

type DownloadEventDescription = {
	beginDownload: ReturnParameter<typeof validSendChannels.beginDownload>;
};

// type DownloadEventToFront = typeof validReceiveChannels[number];
type DownloadEventToFront = typeof validReceiveChannels;
// type EventToFront = 'downloadProgress';

class DownloadControlAPI extends IPCApi<DownloadEventDescription, DownloadEventToFront> {
	private static instance: DownloadControlAPI;
	private constructor() {
		super(apiName, Object.keys(validSendChannels), Object.keys(validReceiveChannels));
	}
	public static getInstance(): DownloadControlAPI {
		if (!DownloadControlAPI.instance) {
			DownloadControlAPI.instance = new DownloadControlAPI();
		}

		return DownloadControlAPI.instance;
	}

	emitInternal<Key extends EventKey<DownloadEventDescription>>(key: Key, toSend: DownloadEventDescription[Key]) {
		this.emit(key, toSend);
	}
}
export { DownloadControlAPI, DownloadEventToFront, DownloadEventFromFront };
export default DownloadControlAPI.getInstance();
