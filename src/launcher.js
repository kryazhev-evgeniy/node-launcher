const path = require('path')
const {Client, Authenticator} = require('minecraft-launcher-core')

const rootPath = path.join(__dirname,"../minecraft")
const installerPath = path.join(__dirname,"./Assets/forge-1.16.4-35.1.37-installer.jar")
const client = new Client()

let options = {
    authorization: Authenticator.getAuth("username"),
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

module.exports = {
    options,
    client
}