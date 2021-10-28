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
	// export default class IPCApi {
	apiName: string = 'api';
	eventEmitter: EventEmitter<EventFromFront>;
	// validSendChannels: SendChannels = {};
	validSendChannels: string[] = [];
	validReceiveChannels: string[] = [];

	constructor(apiName: string, validSendChannels: string[], validReceiveChannels: string[]) {
		this.apiName = apiName;
		this.validSendChannels = validSendChannels;
		this.validReceiveChannels = validReceiveChannels;
		this.eventEmitter = new EventEmitter();
	}

	initIpcMain(ipcMain: IpcMain, mainWindow: BrowserWindow) {
		if (mainWindow) {
			for (let channel of this.validSendChannels) {
				ipcMain.on(`${this.apiName}+${channel}`, async (event: any, message: any) => {
					this.emitInternal(channel, { mainWindow, event, message });
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
		// this.eventEmitter.emit(key, data);
	}

	protected abstract emitInternal(key: any, toSend: any): void;

	sendToRender<Key extends EventKey<EventToFront>>(mainWindow: BrowserWindow, channel: Key, arg: EventToFront[Key]) {
		mainWindow.webContents.send(`${this.apiName}+${channel}`, arg);
	}
}

export { ReturnParameter, IPCApi };

export default IPCApi;
