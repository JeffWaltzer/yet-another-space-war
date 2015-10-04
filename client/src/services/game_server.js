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

  service.update_ship_outlines= function(screen_objects, my_ship_id) {
    service.screen_objects= [];
    _.each(screen_objects, function(a_screen_object, id) {
      service.screen_objects.push({
        color: ((id === my_ship_id) ? 'green' : 'white'),
        polygon_string: SVG.polygon_string(a_screen_object.outline),
        score: a_screen_object.score,
        position: a_screen_object.position
      });
    });
  };

  return service;
}]);
