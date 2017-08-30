const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

let win
let fileName

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index_dialog.html'),
      protocol: 'file:',
      slashes: true
   }))
}

ipcMain.on('openFile', (event, path) => {
      const {dialog} = require('electron')
      const fs = require('fs')
      dialog.showOpenDialog({ filters: [{ name: 'text', extensions: ['txt']}]}, function (fileNames) {
            // fileNames is an array that contains all the selected
            if(fileNames === undefined){
                  console.log("No file selected");
            }else{
                  readFile(fileNames[0]);
            }
      });

      function readFile(filepath){
            fileName = filepath
            fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                  alert("An error ocurred reading the file :" + err.message)
                  return
            }
            // handle the file content
            event.sender.send('fileData', data)
            })
      }
})

ipcMain.on('saveFile', (event, data) => {
      const {dialog} = require('electron')
      const fs = require('fs')
      
      dialog.showSaveDialog(function (fileName) {
            if(fileName === undefined){
                  //console.log(event);
                  //console.log(data);
                  //console.log("No file selected");
                  dialog.showErrorBox("Error","No file selected");
            }else{
                  writeFile(fileName, data);
            }
      });

      function writeFile(fileName,data){
            fs.writeFile(fileName, data, (err) => {
                  if(err){
                        //alert("An error ocurred writing the file :" + err.message)
                        dialog.showErrorBox("File Save Error", err.message);
                  } else {
                        //event.sender.send('fileSaved')
                        dialog.showMessageBox({ message: "The file has been saved! :-)", buttons: ["OK"] });
                  }
            })
      }
})

app.on('ready', createWindow)
