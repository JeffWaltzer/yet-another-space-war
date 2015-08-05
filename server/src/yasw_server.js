var http = require("http");
var engine_io = require('engine.io');
var fs= require('fs');
var url= require('url');
var underscore= require('underscore');
var ship= require('./ship');
var game= require('./game');
var vector= require('./vector');
var Cookies = require('cookies');

exports.createServer= function(parameters) {
  var yasw_server= {};
  var http_server;

  yasw_server.ship_rotation_rate = (parameters && parameters.ship_rotation_rate) || Math.PI;
  yasw_server.tick_rate = (parameters && parameters.tick_rate) || 1;
  yasw_server.acceleration_rate = (parameters && parameters.acceleration_rate) || 1;
  yasw_server.debug= (parameters && parameters.debug) || false;
  yasw_server.bullet_speed = (parameters && parameters.bullet_speed) || 70;

  var top_edge= (parameters && parameters.top_edge) || 600;
  var right_edge= (parameters && parameters.right_edge) || 800;

  yasw_server.field_size= new vector.Vector([right_edge, top_edge]);
  yasw_server.bullet_life_time = (parameters && parameters.bullet_life_time) || 4;

  yasw_server.game= new game.Game(yasw_server);

  yasw_server.on_new_connection= function(socket) {
    console.log("websocket connect from " + socket.remoteAddress);
    return yasw_server.game.add_ship({socket: socket});
  };


  yasw_server.on_connect= function(request, response) {

    var cookies= new Cookies(request,response);

    cookies.set('yasw_game_id', '1');

    var filename = url.parse(request.url).pathname;
    if (filename == '/')
      filename = "/index.html";
    yasw_server.static_page(filename, response);
  };

  yasw_server.listen= function(port) {
    http_server= http.createServer(yasw_server.on_connect);
    http_server.on('close', _.bind(function() {this.emit('close');}, this));
    
    var listener = http_server.listen(port);
    var engine_server = engine_io.attach(listener);
    engine_server.on('connection', yasw_server.on_new_connection);
    console.log('listen on port ' + port);
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
