var underscore= require('underscore');
var matrix= require('matrixmath');

exports.Ship= function(initial_state) {
  var self= this;

  self.rotation= initial_state.rotation;
  self.points= initial_state.points;
  self.heading= initial_state.heading;
  self.socket = initial_state.socket;
  self.location= initial_state.location || [0,0];

  self.outline= function(foo) {
    var translation_out= new matrix.Matrix(3,3);
    translation_out.setData(
      [
        1, 0, -self.location[0],
        0, 1, -self.location[1],
        0, 0, 1
      ]);

    var translation_back= new matrix.Matrix(3,3);
    translation_back.setData(
      [
      1, 0, self.location[0],
      0, 1, self.location[1],
      0, 0, 1
      ]);

    var rotation= new matrix.Matrix(3,3);
    rotation.setData(
      [
      Math.cos(self.heading), -Math.sin(self.heading), 0,
      Math.sin(self.heading),  Math.cos(self.heading), 0,
      0, 0, 1
      ]);

    var composite_transform= matrix.Matrix.multiply(translation_out,
                                                    rotation,
                                                    translation_back);
    // DEBUG
    if (foo === true) {
      console.log("heading:", self.heading);
      console.log("translation_out", translation_out.toLogString());
      console.log("translation_back", translation_back.toLogString());
      console.log("rotation", rotation.toLogString());

      console.log("transform: ");
      console.log(composite_transform.toLogString());
    }

    var points= underscore.map(self.points,
      function(p) {
        return new matrix.Matrix(3, 1, p[0], p[1], 1);
      });

    var transformed_points= underscore.map(
      function(p) {
        matrix.Matrix.multiply(composite_transform, p);
      });

    return underscore.map(points,
                          function(p) {
                            return [p.getData()[0], p.getData()[1]];
                          });
  };
};
