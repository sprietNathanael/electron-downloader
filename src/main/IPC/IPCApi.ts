// import { APIChannels, SendChannels } from './channelsInterface';
// export interface ReceiveChannels {
// 	[key: string]: Function;
// }
import { BrowserWindow, IpcMain } from 'electron';
import { Emitter, EventDescription, EventEmitter, EventKey, EventReceiver } from '../../utils/EventEmitter';

type ReturnParameter<EventFromFrontType> = {
	mainWindow: BrowserWindow;
	event: any;
	message: EventFromFrontType;
};

abstract class IPCApi<EventFromFront extends EventDescription, EventToFront extends EventDescription>
	implements Emitter<EventFromFront>
{
	apiName: string = 'api';
	eventEmitter: EventEmitter<EventFromFront>;
	validSendChannels: string[] = [];
	validReceiveChannels: string[] = [];
	mainWindow: BrowserWindow;

	constructor(apiName: string, validSendChannels: string[], validReceiveChannels: string[]) {
		this.apiName = apiName;
		this.validSendChannels = validSendChannels;
		this.validReceiveChannels = validReceiveChannels;
		this.eventEmitter = new EventEmitter();
	}

	initIpcMain(ipcMain: IpcMain, mainWindow: BrowserWindow) {
		if (mainWindow) {
			this.mainWindow = mainWindow;
			for (let channel of this.validSendChannels) {
				ipcMain.on(`${this.apiName}+${channel}`, async (event: any, message: any) => {
					this.emit(channel, message);
				});
			}
		}
	}

	on<Key extends EventKey<EventFromFront>>(key: Key, fn: EventReceiver<EventFromFront[Key]>) {
		this.eventEmitter.on(key, fn);
		return this;
	}

	off<Key extends EventKey<EventFromFront>>(key: Key, fn: EventReceiver<EventFromFront[Key]>) {
		this.eventEmitter.off(key, fn);
		return this;
	}

	emit<Key extends EventKey<EventFromFront>>(key: Key, data: EventFromFront[Key]) {
		this.eventEmitter.emit(key, data);
	}
	sendToRender<Key extends EventKey<EventToFront>>(channel: Key, arg: EventToFront[Key]) {
		this.mainWindow.webContents.send(`${this.apiName}+${channel}`, arg);
	}
}

export { ReturnParameter, IPCApi };

export default IPCApi;
