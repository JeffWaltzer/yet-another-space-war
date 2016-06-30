var meta= require('./meta');
var vector = require('./vector');
var screen_object= require('./screen_object');
var MortalObject= require('./mortal_object');
var util = require('util');

var Fragment= meta.objectify(function(initial_state) {
  
  initial_state.points= initial_state.points || [[0, 0], [5, 0], [2.5, 4.33]];
  screen_object.ScreenObject.call(this, initial_state);

  this.life_left = initial_state.life_left || 3;
});

exports.Fragment = Fragment;

util.inherits(Fragment, screen_object.ScreenObject);

Fragment.method('is_fragment', function() {return true;});

Fragment.method('ignores_collisions', function() {return true;});

Fragment.mixin(MortalObject);
