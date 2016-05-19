var vector = require('./vector');
var screen_object= require('./screen_object');
var util = require('util');

exports.Fragment = function(initial_state) {
  
  initial_state.points= initial_state.points || [[0,0],[0,1]];
  screen_object.ScreenObject.call(this, initial_state);

  // self.velocity = new vector.Vector([0, 0]);

  this.life_left = initial_state.life_left || 0;
};

util.inherits(exports.Fragment, screen_object.ScreenObject);

exports.Fragment.prototype.is_fragment = function() {
  return true;
};

exports.Fragment.prototype.update= function(tick_rate, rotation_rate, acceleration_rate) {
  this.life_left -= 1 / tick_rate;
  exports.Fragment.super_.prototype.update.call(this, tick_rate);
};

exports.Fragment.prototype.live = function() {
  return this.life_left > 0;
};
