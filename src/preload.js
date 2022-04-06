/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs/promises');
const { contextBridge, ipcRenderer } = require('electron');

const spectateScriptFile = './src/inject/spectate.js';
const spectateCssFile = './src/inject/spectate.css';

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

const loadSpectateScript = () => loadInjectableFile(spectateScriptFile);

const loadSpectateCss = () => loadInjectableFile(spectateCssFile);

const openSpectator = (spectate = '') => ipcRenderer.invoke('open-window', spectate);

contextBridge.exposeInMainWorld('spectate', {
  loadSpectateScript,
  loadSpectateCss,
  openSpectator,
});
