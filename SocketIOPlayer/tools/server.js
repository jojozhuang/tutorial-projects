import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import favicon from 'serve-favicon';
import playerApi from '../src/api/PlayerApi';

const port = 12100;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(favicon(path.join(__dirname,'../public','assets','favicon.ico')));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');
 
  /*
  socket.on('current', (time) => {
    console.log('socket.message');
    console.log(time);
  });*/

  socket.on('updateTime', function(data) {
   // console.log('server.updateTime');
    console.log(data);
    
    playerApi.getWhiteBoardData(data.time, function(wbdata) {
      //console.log('wb'+data.second);
      socket.emit('drawWhiteboard', {
        wbdata:wbdata
      });
    });

    playerApi.getImageData(data.time, function(imagedata) {
      console.log('server.emit.drawScreenShot');
      socket.emit('drawScreenshot', {
        imagedata:imagedata
      });
    });
  });
});

function tick () {
  let dt = new Date();
  dt = dt.toUTCString();
  //console.log("current:"+ dt);
  io.sockets.emit("current", dt);
}
setInterval(tick, 1000);