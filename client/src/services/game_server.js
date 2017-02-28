angular.module('YASW').factory('game_server', ["$location", "SVG" ,function($location, SVG) {
  var service= {};

  service.polygons= [];

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

  service.update_ship_wireframes= function(polygons) {
    service.polygons= [];
    _.each(polygons, function(a_polygon) {
      service.polygons.push({
        color: a_polygon.wireframe[0].color,
        polygon_string: SVG.polygon_string(a_polygon.wireframe[0]._points),
        score: a_polygon.score,
        position: a_polygon.position
      });
    });
  };

  return service;
}]);
