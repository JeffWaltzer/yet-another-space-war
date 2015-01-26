var http = require("http");

exports.createServer= function() {
  var server= {};

  var http_server= http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/json"});
    response.write('[[100, 100], [125, 85], [150, 100], [125, 50]]');
    response.end();
  });

  server.listen= function(port) {
    http_server.listen(port);
  };

  server.shutdown= function() {
    http_server.close();
    http_server= null;
  };

  return server;
};
