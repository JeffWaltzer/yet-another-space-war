var http = require("http");
var engine_io = require('engine.io');
var fs= require('fs');
var url= require('url');

exports.createServer= function() {
  var yasw_server= {};
  var http_server;
  yasw_server.listen= function(port) {

    http_server= http.createServer(function(request, response) {
      filename= url.parse(request.url).pathname;
      if (filename == '/')
        filename= "/index.html";
      yasw_server.static_page(filename, response);
    });
    
    var listener = http_server.listen(port);
    var engine_server = engine_io.attach(listener);
    engine_server.on('connection', function(socket) {
      socket.send("0");
      socket.send('{"0": [[30,30], [20,30],[30,40]] }');
    });
  };

  yasw_server.shutdown= function() {
    http_server.close();
    http_server= null;
  };

  yasw_server.static_page= function(page, response) {
    var filename= "public" + page;
    var file_extension= page.split(".").pop();
    var read_stream= fs.createReadStream(filename);
    read_stream.on('open', function() {
      if (file_extension === "js")
        response.writeHead(200, {"Content-Type": "text/javascript"});
      else
        response.writeHead(200, {"Content-Type": "text/html"});
      read_stream.pipe(response);
    });
    read_stream.on('error', function() {
      response.writeHead(404);
      response.end();
    });
  };

  return yasw_server;
};
