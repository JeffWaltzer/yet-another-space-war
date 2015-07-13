var vector = require('./vector');
var screen_object= require('./screen_object');
var util = require('util');

exports.Bullet = function(initial_state) {
  screen_object.ScreenObject.call(this, initial_state);

  var self = this;

  self.velocity = new vector.Vector([0, 0]);
  self.position = new vector.Vector([0, 0]);

  self.life_left = initial_state.life_left || 0;

  if (initial_state.position) {
    self.position = new vector.Vector(
      initial_state.position);
  }

  if (initial_state.velocity) {
    self.velocity = new vector.Vector(
      initial_state.velocity);
  }

  if (initial_state.ship) {
    self.ship = initial_state.ship;
  }
};

util.inherits(exports.Bullet, screen_object.ScreenObject);
