var http = require("http");
var engine_io = require('engine.io');

exports.createServer= function() {
    var yasw_server= {};
    var http_server;
    yasw_server.listen= function(port) {

        http_server= http.createServer(function(request, response) {
            yasw_server.landing_page(response);
        });

        var listener = http_server.listen(port);
        var engine_server = engine_io.attach(listener);
        engine_server.on('connection', function(socket) {
            socket.send("[[10,10],[15,10],[10,15]]");
        });
    };

    yasw_server.shutdown= function() {
        http_server.close();
        http_server= null;
    };

    yasw_server.landing_page= function(response) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('Welcome to Space War.');
        response.end();
    };

    return yasw_server;
};
