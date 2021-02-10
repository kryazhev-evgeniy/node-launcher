const customTitlebar = require('custom-electron-titlebar');
const ipc = require('electron').ipcRenderer

let progress = document.querySelector('#progress-bar')
let btnPlay = document.querySelector('#btnPlay')
let errAlert = document.querySelector('#errAlert')
let inputUsername = document.querySelector('#username')
let titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#444'),
    menu: null,
});

titlebar.updateTitle("Minecraft Launcher")

function setErr(data) {
    errAlert.classList.remove("is-hidden")
    setTimeout(() => {
        errAlert.classList.add("is-hidden")
    }, 3000)
    errAlert.innerHTML = data;
}

btnPlay.addEventListener('click', (e) => {
    if (inputUsername.value != "") {
        btnPlay.toggleAttribute('disabled')
        progress.classList.toggle('is-hidden')
        ipc.send("play", inputUsername.value)
    } else {
        setErr("Введите ваше имя")
    }
})

ipc.on('err', (event, data) => {
    setErr(data)
})

ipc.on('progress-game', (event,data) => {
    progress.setAttribute('min',0);
    progress.setAttribute('value',data.task);
    progress.setAttribute('max',data.total);
})

ipc.on("close-game", (event,data) => {
    btnPlay.toggleAttribute('disabled')
    progress.classList.toggle('is-hidden')
})