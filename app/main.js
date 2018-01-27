const electron = require('electron');
const {app, BrowserWindow} = electron;

const path = require('path');
const url = require('url');

const logger = require('winston');
logger.level = 'debug';
global.logger = logger;

let mainWindow

function createWindow() {
    logger.debug('App started!')

    mainWindow = new BrowserWindow({ width: 300, height: 530, titleBarStyle: 'hidden',
        minimizable: false, maximizable: false, resizable: false, fullscreenable: false,
        icon: path.join(__dirname, 'assets/app.icns')})

    // mainWindow.webContents.openDevTools();

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    app.quit();
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})