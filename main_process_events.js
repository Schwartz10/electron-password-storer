const {ipcMain} = require('electron');
const {setPassword, getPassword} = require('keytar');

ipcMain.on('store-key', (event, service, username, password) => {
  // if the user didn't enter a username, password, or service, send back an error
  if (!service || !username || !password) {
    event.sender.send('store-key-reply', false);
  } else {
    service = service.trim().toLowerCase();
    setPassword(service, username, password);
    event.sender.send('store-key-reply', true);
  }
});


