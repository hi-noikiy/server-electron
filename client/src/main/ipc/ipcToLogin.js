

const {ipcMain} = require('electron')
const IPCLOGIN = require('./../../ipcCfg').LOGINIPC;

import FilesUrl from './../configs/filesUrl'; 
import win from './../utils/createWin';
import winConfigs from './../configs/winConfigs';

const indexOptions= winConfigs.indexOptions;
const winURL = FilesUrl.index;


// 接收登陆
ipcMain.on(IPCLOGIN.LOGIN, (event, arg) => {

    win(winURL,indexOptions);
    event.sender.send(IPCLOGIN.LOGIN, {success:true})
})