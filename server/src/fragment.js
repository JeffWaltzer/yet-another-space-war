var vector = require('./vector');
var screen_object= require('./screen_object');
var MortalObject= require('./mortal_object');
var util = require('util');

exports.Fragment = function(initial_state) {
  
  initial_state.points= initial_state.points || [[0,0],[0,1]];
  screen_object.ScreenObject.call(this, initial_state);

  this.life_left = initial_state.life_left || 0;
};

util.inherits(exports.Fragment, screen_object.ScreenObject);

exports.Fragment.prototype.is_fragment = function() {
  return true;
};

exports.Fragment.prototype.update= MortalObject.update;
exports.Fragment.prototype.live = MortalObject.live;
