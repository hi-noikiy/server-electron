/**
 * 窗体定义配置
 */
let winCfg = {}
import {nativeImage } from 'electron'
const path = require('path')
const iconPath = path.join(__dirname + '/logo.png')
var image = nativeImage.createFromPath(iconPath)
winCfg = {
  loginOptions: {
    width: 540,
    height: 260,
    frame: false,
    minWidth: 460,
    // alwaysOnTop: true,
    resizable: false,
    transparent: true,
    icon: image,
    dev: false,
    name: 'loginOptions'
  },
  indexOptions: {
    width: 1600,
    height: 1024,
    minWidth: 1024,
    frame: false,
    minHeight: 660,
    resizable: true,
    transparent: true,
    icon: image,
    dev: false,
    name: 'indexOptions'
  }
}

export default winCfg
