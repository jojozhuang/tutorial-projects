var http = require("http");

http.createServer(function (request, response) {

   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // Send the response body as "Hello World"
   response.end('Hello World from Node Server at port 8088!\n');
}).listen(8088);

// Console will print the message
console.log('Server running at http://127.0.0.1:8088/');
