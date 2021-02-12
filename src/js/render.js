const customTitlebar = require('custom-electron-titlebar');
let titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#444'),
    menu: null,
});

titlebar.updateTitle("Minecraft Launcher")


//https://files.minecraftforge.net/maven/net/minecraftforge/forge/1.16.4-35.1.37/forge-1.16.4-35.1.37-installer.jar

