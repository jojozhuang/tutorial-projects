var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

require('./Date.prototype.dateAdd');

var html = fs.readFileSync('index.html', 'utf8');
function handler (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
  res.end(html);
}
function tick () {
  var dt = new Date();
  //dt.dateAdd('month', -7);
  //dt.dateAdd('year', -1);
  //dt.dateAdd('day', 10);
  dt = dt.toUTCString();

  io.sockets.send(dt);
}
setInterval(tick, 1000);
app.listen(8080);

// Console will print the message
console.log('Server running at http://127.0.0.1:8080/');
