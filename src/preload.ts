import downloadControlAPI from './main/IPC/Apis/DownloadControlAPI';
import { generateContextBridge } from './main/IPC/contextBridge';

generateContextBridge([downloadControlAPI]);
