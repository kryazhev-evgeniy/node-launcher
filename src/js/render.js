const ipc = require('electron').ipcRenderer

function PlayGame(){
    var input = document.querySelector("#username");
    ipc.send("play_game",{
        username: input.value
    })
}

ipc.on('err',(event,data) => {
    alert(data)
})
ipc.on("done", (event,data) => {
    document.querySelector("#play").style.display = "none"
})
ipc.on("progress-data",(event,data) => {
    let bar = document.querySelector("#progress-bar")
    bar.setAttribute("max", data.total)
    bar.setAttribute("value", data.task)
})