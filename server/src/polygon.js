var _= require('underscore');
var transforms= require('./transform');

function Polygon(points,color) {
  this._color = color || 'white';
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
  return new Polygon(returned_points, this._color);
}

function find_bounding_box(bounding_box) {
  _(this._points).each(
      function (p) {
        var x = p[0];
        var y = p[1];
        if (bounding_box) {
          if (x > bounding_box.right) bounding_box.right = x;
          if (x < bounding_box.left) bounding_box.left = x;
          if (y > bounding_box.top) bounding_box.top = y;
          if (y < bounding_box.bottom) bounding_box.bottom = y;
        } else {
          bounding_box = {};
          bounding_box.left = bounding_box.right = x;
          bounding_box.top = bounding_box.bottom = y;
        }
      },
      this);
  return bounding_box;
}

Polygon.accessor('color');
Polygon.accessor('points');
Polygon.prototype.find_bounding_box = find_bounding_box;
Polygon.prototype.transform_polygon = transform_polygon;

exports.Polygon=Polygon;
