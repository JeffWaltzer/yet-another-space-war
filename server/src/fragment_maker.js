var underscore = require('underscore');


var shape = [[5, 0], [1.24, 3.80], [-4.85, 3.53], [-2.43, -1.76], [1.85, -2.85]];


var fragmentShapes = [
  underscore.map(shape, function (point) {
    return [point[0] * 1, point[1] * 1];
  }),
  underscore.map(shape, function (point) {
    return [point[0] * 3, point[1] * 2];
  }),
  underscore.map(shape, function (point) {
    return [point[0] * 1, point[1] * 4];
  })
];

exports.fragment_shapes = fragmentShapes;
