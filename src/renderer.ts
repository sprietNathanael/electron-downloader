/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

// import './index.css';

// console.log('👋 This message is being logged by "renderer.js", included via webpack');
import { DownloadEventFromFront, DownloadEventToFront } from './main/IPC/Apis/DownloadControlAPI';
import './renderer/index';
import { EventDescription, EventKey } from './utils/EventEmitter';

type EventReceiver<Key> = (params: Key) => void;

export interface IElectronAPI<EventToFront extends EventDescription, EventFromFront extends EventDescription> {
	send: <Key extends EventKey<EventFromFront>>(channel: Key, data: EventFromFront[Key]) => Promise<void>;
	// receive: <Key extends EventKey<EventFromFront>>(channel: Key, func: (event: any, arg: any) => void) => Promise<void>;
	receive: <Key extends EventKey<EventToFront>>(
		channel: Key,
		func: EventReceiver<EventToFront[Key]>
	) => Promise<void>;
}

declare global {
	interface Window {
		ipcApi: {
			downloadControl: IElectronAPI<DownloadEventToFront, DownloadEventFromFront>;
		};
		types: {
			DownloadInfo: DownloadInfo;
		};
	}
}
