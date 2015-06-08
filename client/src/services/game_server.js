
angular.module('YASW').factory('game_server', ["$location", "SVG" ,function($location, SVG) {
  var service= {};

  service.screen_objects= [];

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

  service.update_ship_outlines= function(ship_outlines) {
    _.each(ship_outlines, function(an_outline, id) {
      service.screen_objects[id] = {polygon_string: SVG.polygon_string(an_outline)}; });
  };

  return service;
}]);
