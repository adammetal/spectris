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

const openSpectator = (spectate = '') => ipcRenderer.invoke('open-window', spectate);

const selectInjectableCss = () => ipcRenderer.invoke('select-file', '.css');

const selectInjectableJs = () => ipcRenderer.invoke('select-file', '.js');

contextBridge.exposeInMainWorld('spectate', {
  loadSpectateScript,
  loadSpectateCss,
  openSpectator,
  selectInjectableCss,
  selectInjectableJs,
});
