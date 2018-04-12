const {ipcMain} = require('electron');
const {setPassword, getPassword} = require('keytar');

ipcMain.on('store-key', (event, service, username, password) => {
  setPassword(service, username, password);
  event.sender.send('store-key-reply', true);
});


