const {app,ipcMain, BrowserWindow} = require('electron')
const launher = require('./launcher')
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
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("play", (event, arg) => {
  launher.client.launch(launher.options)
  launher.client.on('debug', (e) => console.log(e));
  launher.client.on('data', (e) => console.log(e));
})





