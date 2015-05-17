
angular.module('YASW').factory('game_server', ["$location", "SVG" ,function($location, SVG) {
  var service= {};

  service.ships= [];

  service.send= function(e) {
    var message= {command: e};
    service.web_socket.send(JSON.stringify(message));
  };

  service.web_socket =
    eio(
      'ws://'+
      $location.host() +
        ':' + $location.port(),
      {transports: ['websocket']});

  service.update_ship_outlines= function(data) {
    _.each(data, function(value, id) {
      service.ships[id] = {polygon_string: SVG.polygon_string(value)}; });
  };

  return service;
}]);
