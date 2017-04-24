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

  service.update_ship_wireframes = function (polygons) {
    service.polygons = [];
    _.each(polygons, function (a_polygon) {
      _.each(a_polygon.wireframe, function (a_wireframe, index) {
        service.polygons.push({
          color: a_wireframe.color,
          polygon_string: SVG.polygon_string(a_wireframe.points),
          score: index === 0 ? a_polygon.score : null,
          position: a_polygon.position
        });
      });

    });
  };

  return service;
}]);
