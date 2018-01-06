'use strict'
import {BrowserWindow} from 'electron';

var win = {};

function createWindow (winURL,option) {
    let mainWindow
    var options = Object.assign({},option)
    mainWindow = new BrowserWindow(option)
    mainWindow.loadURL(winURL)
    win[mainWindow.id] = mainWindow;
    
    mainWindow.on('closed', () => {
      mainWindow = null;
      win[mainWindow.id]=null;
    })
    return mainWindow;
  }

export default createWindow;