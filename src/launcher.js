const EventEmitter = require('events');
const path = require('path')
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const core = require('minecraft-launcher-core')
const urlForge = "https://files.minecraftforge.net/maven/net/minecraftforge/forge/1.16.4-35.1.37/forge-1.16.4-35.1.37-installer.jar"
const pathRoot = "minecraft"
const pathForge = "forge.jar"
const client = new core.Client();


function IsForge() {
    try {
        if (fs.existsSync(pathForge)) {
            return true;
        }
    } catch (err) {
        return false;
    }
}

function DownloadForge(file, url,eventend) {
    let localFile = fs.createWriteStream(file);
    return http.get(url, function(response) {
        var len = parseInt(response.headers['content-length'], 10);
        var cur = 0;
        var total = len / 1048576; //1048576 - bytes in 1 Megabyte

        response.on('data', function(chunk) {
            cur += chunk.length;
            client.emit("progress-forge",{
                type: "forge",
                task: cur,
                total: len
            })
        });

        response.on('end', function() {
            console.log("Download complete");
            eventend();
        });

        response.pipe(localFile);
    });
}

function start(data){
    let options = {
        authorization: core.Authenticator.getAuth(data.username),
        root: pathRoot,
        forge: pathForge,
        version: {
            number: "1.16.4",
            type: "release"
        },
        memory: {
            max: "6G",
            min: "4G"
        }
    }

    if(IsForge()){
        client.launch(options);
    }else{
        DownloadForge(pathForge,urlForge, () => {
            client.launch(options);
        });
    }

    client.on("data", e => console.log(e))
    client.on("debug", e => console.log(e))
    client.on("progress", e => console.log(e))

    return client;
    
}

module.exports = {
    start,
    DownloadForge,
    urlForge,
}