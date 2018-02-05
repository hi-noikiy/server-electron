
const {app, ipcMain} = require('electron')
const IPCINDEX = require('./../../ipcCfg').INDEXIPC
import Store from './../store/store'
const store = Store()
// 应用退出
ipcMain.on(IPCINDEX.CLOSE, (event, msg) => {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
})

// 主渲染区登陆获取用户信息
ipcMain.on(IPCINDEX.GETUSERINFO, (event, msg) => {
  event.returnValue = {
    user: store.getState('user'),
    access_token: store.getState('access_token')
  }
})
