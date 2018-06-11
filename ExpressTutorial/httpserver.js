var http = require("http");

function requestHandler(request, response) {
  console.log("In comes a request to: " + request.url);
  response.end("Hello, world(http)!");
}

var server = http.createServer(requestHandler);
server.listen(3000, function() {
  console.log("Web server(http) started on port 3000.");
});
