vector = require('./vector');
exports.Bullet = function() {
  var self = this;
  self.velocity = new vector.Vector([0, 0]);
  self.position = new vector.Vector([0, 0]);
};