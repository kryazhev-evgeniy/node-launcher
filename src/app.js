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
  //mainWindow.webContents.openDevTools();

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
  
  let options = {
    authorization: launcher.Authenticator.getAuth(arg),
    root: path.join(__dirname, "../minecraft"),
    forge: path.join(__dirname, "./forge-1.16.4-35.1.37-installer.jar"),
    version: {
        number: "1.16.4",
        type: "release"
    },
    memory: {
        max: "6G",
        min: "4G"
    }
  }

  launcher.options.authorization = launcher.Authenticator.getAuth(arg)
  launcher.client.launch(launcher.options)
  launcher.client.on('debug', (e) => console.log(e));
  launcher.client.on('data', (e) => console.log(e));

  launcher.client.on('progress', (e) => {
    console.log(e)
    event.sender.send("progress-game", e);
  })

  launcher.client.on('close', (e) => {
    event.sender.send('close-game');
  })

})





