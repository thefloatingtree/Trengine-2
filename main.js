const { app, BrowserWindow } = require('electron')
const debug = require('electron-debug')

function createWindow() {

    debug({ showDevTools: false })
    // if (process.env.NODE_ENV !== 'production') {
    // }

    const win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    win.webContents.openDevTools();

    win.setMenu(null)
    win.loadFile('./index.html')
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