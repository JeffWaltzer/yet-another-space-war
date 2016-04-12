var vector = require('./vector');
var screen_object= require('./screen_object');
var util = require('util');

exports.Fragment = function(initial_state) {
  initial_state.points= initial_state.points || [[0,0],[0,1]];
  screen_object.ScreenObject.call(this, initial_state);

  // self.velocity = new vector.Vector([0, 0]);

  this.life_left = initial_state.life_left || 0;

  // if (initial_state.velocity) {
  //   self.velocity = new vector.Vector(
  //     initial_state.velocity);
  // }

  // self.ship=function(new_value) {
  //   if(new_value) {
  //     self._ship = new_value;
  //   }
  //   return self._ship;
  // };

  // if (initial_state.ship) {
  //   self.ship( initial_state.ship);
  // }

  // self.update= function(tick_rate, rotation_rate, acceleration_rate) {
  //   self.life_left -= 1 / tick_rate;
  //   exports.Fragment.super_.prototype.update.call(this, tick_rate);
  // };

  // self.live = function() {
  //   return self.life_left > 0;
  // };
};

util.inherits(exports.Fragment, screen_object.ScreenObject);

exports.Fragment.prototype.is_fragment = function() {
  return true;
};