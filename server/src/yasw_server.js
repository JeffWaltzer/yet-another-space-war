var http = require("http");
var engine_io = require('engine.io');

exports.createServer= function() {
    var yasw_server= {};
    var http_server;
    yasw_server.listen= function(port) {

        http_server= http.createServer(function(request, response) {
            response.writeHead(200, {"Content-Type": "text/json"});
            response.write('[[100, 100], [125, 85], [150, 100], [125, 50]]');
            response.end();
        });




        var listener = http_server.listen(port);
        var engine_server = engine_io.attach(listener);
        engine_server.on('connection', function(socket) {
            console.log('service with pleasure');
            socket.send("[[10,10],[15,10],[10,15]]");
        });
    };

    yasw_server.shutdown= function() {
        http_server.close();
        http_server= null;
    };

    return yasw_server;
};
