const {app, ipcMain, BrowserWindow} = require('electron')
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const path = require('path')


function createWindow () {
  const mainWindow = new BrowserWindow({
    title: "Laucher Minecraft",
    icon: path.join(__dirname,"../Assets/logo.ico"),
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname,"./preload.js"),
      nodeIntegration: true,
    }
  })

  mainWindow.setMenu(null);
  mainWindow.loadURL(`file://${path.join(__dirname,"../views/index.html")}`)
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



ipcMain.on("play_game",(event,data) => {

  const rootPath = path.join(__dirname,"../../minecraft")
  const installerPath = path.join(__dirname,"../forge-1.16.4-35.1.37-installer.jar")
  let opts = {
    clientPackage: null,
    authorization: Authenticator.getAuth(data.username),
    root: rootPath,
    installer: installerPath,
    version: {
        number: "1.16.4",
        type: "release"
    },
    memory: {
        max: "6G",
        min: "4G"
    }
  }

  if( data.username && data.username != ""){
    launcher.launch(opts);    

    event.sender.send("done")
    launcher.on('progress', (e) => {
      console.log(e)
      event.sender.send("progress-data", e);
    });
  }else{
    event.sender.send("err", "not username")
  }

})



