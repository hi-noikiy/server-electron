'use strict'
import {BrowserWindow} from 'electron'
import Store from './../store/store'
const store = Store()
var win = {}
var index = 0
function createWindow (winURL, option) {
  let mainWindow
  var options = Object.assign({name: 'win_' + index++}, option)
  var name = options.name
  mainWindow = new BrowserWindow(option)
  mainWindow.loadURL(winURL)

  win[mainWindow.id] = mainWindow

  mainWindow.on('closed', () => {
    let obj = {}
    obj[name] = null
    store.setState(obj)
  })

  var obj = {}
  obj[name] = mainWindow

  store.setState(obj)

  return mainWindow
}

export default createWindow
