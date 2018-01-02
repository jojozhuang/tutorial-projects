import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import favicon from 'serve-favicon';
import courseApi from '../src/api/CourseApi';

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
  console.log('new connection established');

  socket.on('updateTime', function(data) {
    let second = data.time;
    if (second > 0 && second < 12600) {
      console.log('server.updateTime:'+ second);
      // Screenshot
      const ssdata = courseApi.getScreenshotData(second);
      // Whiteboard
      const wbdata = courseApi.getWhiteBoardData(second);

      // Notify client through emit with data
      io.sockets.emit('playCourse', {time: second, ssdata: ssdata, wbdata:wbdata});
    }
  });
});

function tick () {
  let dt = new Date();
  dt = dt.toUTCString();
  io.sockets.emit("realtime", dt);
}
setInterval(tick, 1000);