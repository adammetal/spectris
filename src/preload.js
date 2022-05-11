/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs/promises');
const { contextBridge, ipcRenderer } = require('electron');

const loaderPromises = {};

const loadInjectableFile = (file) => {
  loaderPromises[file] ||= {};

  const promise = loaderPromises[file];

  if (promise.result) {
    return Promise.resolve(promise.result);
  }

  promise.loading ||= fs
    .readFile(file, {
      encoding: 'utf-8',
    })
    .then((code) => {
      promise.result = code;
      return code;
    });

  return promise.loading;
};

const loadSpectateScript = (file) => loadInjectableFile(file);

const loadSpectateCss = (file) => loadInjectableFile(file);

const setSpectatorUrl = (spectate) => ipcRenderer.invoke('set-url', spectate);

const openSpectatorWindow = () => ipcRenderer.invoke('open-spectator-window');

const selectInjectableCss = () => ipcRenderer.invoke('select-file', '.css');

const selectInjectableJs = () => ipcRenderer.invoke('select-file', '.js');

const onSetSpectatorUrl = (cb) => {
  ipcRenderer.on('set-url', cb);

  return () => ipcRenderer.off('set-url', cb);
};

contextBridge.exposeInMainWorld('spectate', {
  loadSpectateScript,
  loadSpectateCss,
  setSpectatorUrl,
  selectInjectableCss,
  selectInjectableJs,
  onSetSpectatorUrl,
  openSpectatorWindow,
});
