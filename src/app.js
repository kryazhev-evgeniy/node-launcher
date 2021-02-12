const {app,ipcMain, BrowserWindow} = require('electron')
const launcher = require('./launcher')
const path = require('path')

require('electron-reload')(__dirname);

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname,"./js/preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname,"./views/index.html"))
}

app.whenReady().then(() => {

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on("play", (event, arg) => {

  const client = launcher.start(arg);

  client.on("data", e => {
    event.sender.send("data",e)
  })

  client.on("debug", e => {
    event.sender.send("debug",e)
  })

  client.on("progress", e => {
    event.sender.send("progress",e)
  })
  
  client.on("progress-forge", e => {
    event.sender.send("progress-download",e)
  })

})





