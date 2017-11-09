var Polygon=require('./polygon').Polygon;
var screen_object= require('./screen_object');
var util = require('util');

function Sun(initial_state) {

  initial_state.shape = [new Polygon(
    [
      [  0, 20],
      [ 14, 14],
      [ 20,  0],
      [ 14,-14],
      [  0,-20],
      [-14,-14],
      [-20,  0],
      [-14, 14]
    ],
    'orange')];

  initial_state.mass = 30000;

  screen_object.ScreenObject.call(this, initial_state);
}

util.inherits(Sun, screen_object.ScreenObject);

Sun.prototype.explode = function() {
};

Sun.prototype.is_sun=function() {
  return true;
};


exports.Sun = Sun;
