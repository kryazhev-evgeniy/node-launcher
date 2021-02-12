const ipc = require('electron').ipcRenderer

function play(){
    let username = document.getElementById("input-username").value
    if(username != ""){
        ipc.send("play", {username: username} )
    }
}

ipc.on("data",(event,data) => {
    document.getElementById("debug").innerHTML += "<p>"+data+"</p>";
})

ipc.on("debug",(event,data) => {
    document.getElementById("debug").innerHTML += "<p>"+data+"</p>";
})

ipc.on("progress",(event,data) => {
    document.getElementById("debug").innerHTML += "<p>"+`${data.type} - ${data.task}/${data.total}`+"</p>";
})

ipc.on("progress-download",(event,data) => {
    document.getElementById("debug").innerHTML += "<p>"+`${data.type} - ${data.task}/${data.total}`+"</p>";
})