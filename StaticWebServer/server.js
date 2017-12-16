var express = require('express');
var app = express();
var path = require('path');

// view at http://localhost:12000/
app.use('/', express.static(path.join(__dirname, '/')))
// view at http://localhost:12000/2048/
//app.use('/2048', express.static(path.join(__dirname, '2048')))

app.listen(12000);
console.log('Server running at http://localhost:12000/');
