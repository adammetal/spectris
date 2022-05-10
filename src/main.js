/* eslint-disable global-require */

// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, ipcMain, screen, dialog } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (type = '') => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  const newWindow = new BrowserWindow({
    width,
    height,
    autoHideMenuBar: true,
    webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.

  // eslint-disable-next-line no-undef
  newWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}?screen=${type}`);
  // newWindow.webContents.openDevTools();

  return newWindow;
  // Open the DevTools.
};

let specWindow;

const createMainWindow = () => createWindow('main');

const createSpecWindow = () => createWindow('spectator');

const createWindows = () => {
  createMainWindow();
  specWindow = createSpecWindow();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => createWindows());

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
  }
});

ipcMain.handle('open-window', (event, spectate = '') =>
  specWindow.webContents.send('set-url', spectate),
);

ipcMain.handle('select-file', (event, type) =>
  dialog.showOpenDialog({ properties: ['openFile'], filters: [type] }),
);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
