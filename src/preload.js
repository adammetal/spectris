const fs = require('fs/promises');
// eslint-disable-next-line import/no-extraneous-dependencies
const { contextBridge } = require('electron');

const spectateScriptFile = './src/inject/spectate.js';
const spectateCssFile = './src/inject/spectate.css';

let loadSpectateScriptPromise;
let loadSpectateCssPromise;

let spectateScriptContent;
let spectateCssContent;

const loadSpectateScript = () => {
  if (spectateScriptContent) {
    return Promise.resolve(spectateScriptContent);
  }

  if (!loadSpectateScriptPromise) {
    loadSpectateScriptPromise = fs
      .readFile(spectateScriptFile, {
        encoding: 'utf-8',
      })
      .then((code) => {
        spectateScriptContent = code;
        return code;
      });
  }

  return loadSpectateScriptPromise;
};

const loadSpectateCss = () => {
  if (spectateCssContent) {
    return Promise.resolve(spectateCssContent);
  }

  if (!loadSpectateCssPromise) {
    loadSpectateCssPromise = fs
      .readFile(spectateCssFile, {
        encoding: 'utf-8',
      })
      .then((code) => {
        spectateCssContent = code;
        return code;
      });
  }

  return loadSpectateCssPromise;
};

contextBridge.exposeInMainWorld('spectate', {
  loadSpectateScript,
  loadSpectateCss,
});
