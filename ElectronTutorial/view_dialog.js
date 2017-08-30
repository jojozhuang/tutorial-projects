let $ = require('jquery')
const {ipcRenderer} = require('electron')

$('#open').on('click', () => {
    ipcRenderer.send('openFile', () => { 
        console.log("Event sent."); 
     }) 
     
     ipcRenderer.on('fileData', (event, data) => { 
        $("#editor").val(data);
     }) 
})

$('#save').on('click', () => {
    ipcRenderer.send('saveFile',$("#editor").val(), () => {
       console.log("Event sent.");
    })
    ipcRenderer.on('fileSaved', (event) => { 
        alert('File is saved!');
     }) 
})