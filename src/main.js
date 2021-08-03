const { app, BrowserWindow } = require('electron')
const debug = require('electron-debug')

require('dotenv').config()

function createWindow() {
    debug({ showDevTools: false })
    
    const win = new BrowserWindow({
        width: 1296,
        height: 759,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    if (process.env.PRODUCTION === "true") {
        win.setResizable(false)
    } else {    
        win.webContents.openDevTools();
    }

    win.setMenu(null)
    win.loadFile('./src/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})