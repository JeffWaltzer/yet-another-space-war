vector = require('./vector');
exports.Bullet = function(parameters) {
  var self = this;

  self.velocity = new vector.Vector([0, 0]);
  self.position = new vector.Vector([0, 0]);

  if (parameters.position) {
    self.position = new vector.Vector(
      parameters.position);
  }
  if (parameters.velocity) {
    self.velocity = new vector.Vector(
      parameters.velocity);
  }

};