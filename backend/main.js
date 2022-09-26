require('dotenv').config();
const path = require('path');

const { BrowserWindow, app } = require('electron');
const { powerSaveBlocker } = require('electron');
const { powerMonitor } = require('electron');
const server = require('./app.js');

const serverPort = 4000;

let mainWindow = null;
const id = powerSaveBlocker.start('prevent-app-suspension')

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768
  });

  mainWindow.loadURL(`http://localhost:${serverPort}`);
  mainWindow.on("closed", function () {
    mainWindow = null;
    powerSaveBlocker.stop(id);
  });
}

app.on("ready", createWindow);
app.setAppLogsPath(path.join(__dirname, 'app.log'));
process.on("uncaughtException", (err, origin) => {
  console.log(`Caught exception: ${err}\n` +
              `Exception origin: ${origin}`
              );
  app.relaunch();
  app.quit();
});
powerMonitor.on('resume', () => {
  console.log('The system is resuming');
  mainWindow.reload();
});
