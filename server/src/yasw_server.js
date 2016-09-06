var http = require("http");
var engine_io = require('engine.io');
var fs= require('fs');
var url= require('url');
var _= require('underscore');
var ship= require('./ship');
var game= require('./game');
var vector= require('./vector');
var Cookies = require('cookies');

exports.createServer= function(parameters) {
    var yasw_server= {};
    var http_server;

    ship.Ship.rotation_rate = (parameters && parameters.ship_rotation_rate) || Math.PI;

    yasw_server.tick_rate = (parameters && parameters.tick_rate) || 1;
    yasw_server.acceleration_rate = (parameters && parameters.acceleration_rate) || 1;
    yasw_server.bullet_speed = (parameters && parameters.bullet_speed) || 70;

    var top_edge= (parameters && parameters.top_edge) || 600;
    var right_edge= (parameters && parameters.right_edge) || 800;

    yasw_server.field_size= new vector.Vector([right_edge, top_edge]);
    yasw_server.bullet_lifetime = (parameters && parameters.bullet_lifetime) || 4;

    yasw_server.game= new game.Game(yasw_server);
    yasw_server.game.start_ticking(yasw_server.tick_rate);

    yasw_server.socket_cookies= function(socket) {
	return socket.request.headers.cookie;
    };

    yasw_server.on_new_websocket= function(socket) {
	var the_ship;
	var cookies = yasw_server.socket_cookies(socket);
	var game= yasw_server.game;
	var player_id;

	_(cookies.split(';')).each(function(cookie) {
            var fields= cookie.split('=');
            var name= fields[0].trim();
            var value= fields[1].trim();

            if (name === 'yasw_player_id')
		player_id= value;
        });

	game.connect_socket(player_id, socket);
	var player = game.players[player_id];

  the_ship= player.ship  ||  game.game_field.add_ship({}, ship.Ship.rotation_rate, game.bullet_speed, game.bullet_lifetime);
	game.connect_ship(player_id, the_ship);

	socket.on('message', _(player.on_message).bind(player));

	return the_ship;
    };

    yasw_server.make_player_id= function() {
	return Math.random();
    };

    yasw_server.on_connect= function(request, response) {
	var cookies= new Cookies(request,response);
	var player_id= cookies.get('yasw_player_id');
	
	if (!player_id || !this.game.players[player_id]) {
	    player_id= yasw_server.make_player_id();
	    cookies.set('yasw_player_id', player_id);
	    this.game.add_player(player_id);
	}
    };

    yasw_server.on_request= function(request, response, on_response_headers_written) {
	var filename= url.parse(request.url).pathname;
	if (filename == '/')
	    filename= "/index.html";
	var status= 200;
	if (filename === "/index.html") {
	    status= 302;
	    response.setHeader("location", "/game.html");
	}

	yasw_server.on_connect(request, response);
	yasw_server.static_page(filename, response, status, on_response_headers_written);
    };

    yasw_server.listen= function(port, done) {
	http_server= http.createServer(yasw_server.on_request);
	
	var listener = http_server.listen(port, function() {if (done) done();});
	var engine_server = engine_io.attach(listener);
	engine_server.on('connection', yasw_server.on_new_websocket);
    };

    yasw_server.shutdown= function(done) {
	var self= this;
	http_server.close(function() {if (done) done(); });
	http_server= null;
    };

    yasw_server.static_page= function(page, response, status, on_headers_written) {
	var filename= "public" + page;
	var file_extension= page.split(".").pop();
	var read_stream= fs.createReadStream(filename);
	if (!status)
	    status= 200;
	read_stream.on('open', function() {
	    if (file_extension === "js")
		response.setHeader("Content-Type", "text/javascript");
	    else
		response.setHeader("Content-Type", "text/html");
	    response.statusCode= status;
	    read_stream.pipe(response);
	    if (on_headers_written)
		on_headers_written();
	});
	read_stream.on('error', function() {
	    response.writeHead(404);
	    response.end();
	});
    };

    return yasw_server;
};

