
angular.module('YASW').factory('game_server', function() {
  var service= {};
  service.send= function() {};

  service.web_socket =
    eio('ws://localhost:3000', {transports: ['websocket']});

  return service;
});
