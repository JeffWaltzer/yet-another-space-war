
angular.module('YASW').factory('game_server', function() {
  var service= {};

  service.send= function(e) {
    message= {command: e};
    service.web_socket.send(JSON.stringify(message));
  };

  service.web_socket =
    eio('ws://localhost:3000', {transports: ['websocket']});

  return service;
});
