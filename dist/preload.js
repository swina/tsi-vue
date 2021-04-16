const { contextBridge, ipcRenderer  } = require('electron');
const Datastore = require( 'nedb' )
//import path from 'path'
const path = require ( 'path' )
console.log  ( path.resolve ( __dirname) )
const db = new Datastore ({
  autoload: true,
  filename: path.join ( __dirname , '../src/assets/data.db' )
})
const validChannels = ['READ_FILE', 'WRITE_FILE'];
contextBridge.exposeInMainWorld(
  'ipc', {
    send: (channel, data) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    on: (channel, func) => {
      if (validChannels.includes(channel)) {
        // Strip event as it includes `sender` and is a security risk
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  },
);
