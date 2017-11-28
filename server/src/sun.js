var Polygon = require('./polygon').Polygon;
var screen_object = require('./screen_object');
var util = require('util');

function Sun(initial_state) {
  if (initial_state.shapes) {
    this._shapes = initial_state.shapes;
  }
  else {
    this._shapes = [
      [
        new Polygon(
	  [
	    [0, 20],
	    [14, 14],
	    [20, 0],
	    [14, -14],
	    [0, -20],
	    [-14, -14],
	    [-20, 0],
	    [-14, 14]
	  ],
	  'orange')
      ],
    ];
  }

  initial_state.mass = 30000;

  if (initial_state.animation_rate)
    this._animation_rate= initial_state.animation_rate;
  else
    this._animation_rate= 10;

  this._shape_index= 0;

  screen_object.ScreenObject.call(this, initial_state);
}

util.inherits(Sun, screen_object.ScreenObject);

Sun.prototype.explode = function () {
};

Sun.prototype.is_sun = function () {
  return true;
};

Sun.prototype.update= function(tick_rate) {
  this._shape_index= (this._shape_index + this._animation_rate/tick_rate) % this._shapes.length;
  this.update_outline();
};

exports.Sun = Sun;

Sun.prototype.shape = function () {
  return this._shapes[Math.floor(this._shape_index)];
};
