angular.module('YASW').factory('SVG', function() {
  var svg = {};

  svg.polygon_string = function(points) {
    return _.map(points,
      function(value) {
        return value.join();
      })
      .join(' ');
  };

  return svg;
});
