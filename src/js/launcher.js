const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

let opts = {
    clientPackage: null,
    authorization: Authenticator.getAuth("username"),
    root: "./minecraft",
    forge: "./forge-1.16.4-35.1.37-installer.jar",
    version: {
        number: "1.16.4",
        type: "release"
    },
    memory: {
        max: "6G",
        min: "4G"
    }
}

function Launch (){
    launcher.launch(opts);
    launcher.on('progress', (e) => event.sender.send("progress",e));
}

module.exports = () => {
    Launch();
}