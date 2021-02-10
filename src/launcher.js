const path = require('path')
const {Client, Authenticator} = require('minecraft-launcher-core')

const rootPath = path.join(__dirname,"../minecraft")
const client = new Client()

let options = {
    authorization: Authenticator.getAuth("username"),
    root: rootPath,
    forge: path.join(__dirname,"./forge-1.16.4-35.1.37-installer.jar"),
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
    Authenticator,
    options,
    client
}