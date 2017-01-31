var _= require('underscore');
var transforms= require('./transform');

function Polygon(points) {

  this._points = points;

}


function transform_polygon(composite_transform) {
  var returned_points = _(this._points).map(
      function (p) {
        var rv = [0, 0, 0];
        transforms.apply_transform(rv, composite_transform, p);
        var x = (rv[0] / rv[2]);
        var y = (rv[1] / rv[2]);
        return [x, y];
      },
      this);
  return returned_points;
}

Polygon.prototype.transform_polygon = transform_polygon;

exports.Polygon=Polygon;