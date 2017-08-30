var net = require('net');
var server = net.createServer(function(connection) {
   console.log('Client Connected');

   connection.on('end', function() {
      console.log('client disconnected');
   });

   connection.write('Hello Worldaaa!\r\n');
   connection.pipe(connection);
});

server.listen(8080, function() {
   console.log('Server running on http://localhost:8080');
});
