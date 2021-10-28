import { contextBridge, ipcRenderer } from 'electron';
// import { APIChannels } from './channelsInterface';
import IPCApi from './IPCApi';

interface APIContextBridge {
	send: (channel: string, data: any) => void;
	receive: (channel: string, func: (arg0: any) => void) => void;
}

export function generateContextBridge(apiList: IPCApi<any, any>[]) {
	let contextList: { [key: string]: APIContextBridge } = {};

	apiList.forEach((api) => {
		let context = getContextBridge(api);
		contextList[api.apiName] = context;
	});
	contextBridge.exposeInMainWorld('ipcApi', { ...contextList });
}

// This is the renderer side
function getContextBridge(api: IPCApi<any, any>): APIContextBridge {
	return {
		send: (channel: string, data: any) => {
			// whitelist channels
			if (api.validSendChannels.find((el) => el === channel)) {
				let fullChannel = `${api.apiName}+${channel}`;
				ipcRenderer.send(fullChannel, data);
			}
		},
		receive: (channel: string, func: (arg0: any) => void) => {
			if (api.validReceiveChannels.includes(channel)) {
				let fullChannel = `${api.apiName}+${channel}`;
				// Deliberately strip event as it includes `sender`
				ipcRenderer.on(fullChannel, (event, ...args: [any]) => {
					func(...args);
				});
			}
		},
	};
}
