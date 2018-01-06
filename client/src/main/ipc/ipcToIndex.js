
const {app,ipcMain} = require('electron')
const IPCINDEX = require('./../../ipcCfg').INDEXIPC;


// 应用退出
ipcMain.on(IPCINDEX.CLOSE,(event,msg)=>{
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
})