var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/json"});
  response.write('[[100, 100], [125, 85], [150, 100], [125, 50]]');
  response.end();
});

server.listen(3000);
console.log("Server is listening");
