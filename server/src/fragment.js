var vector = require('./vector');
var screen_object= require('./screen_object');
var MortalObject= require('./mortal_object');
var util = require('util');

function Fragment(initial_state) {
  initial_state.mass = 0.2;

  screen_object.ScreenObject.call(this, initial_state);

  this.life_left = initial_state.life_left || 3;
}

util.inherits(Fragment, screen_object.ScreenObject);

Fragment.prototype.is_fragment = function() {
  return true;
};

Fragment.prototype.ignores_collisions= function() {
  return true;
};

Fragment.prototype.update= MortalObject.update;
Fragment.prototype.live = MortalObject.live;

exports.Fragment = Fragment;
