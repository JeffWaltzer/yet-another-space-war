var screen_object= require('./screen_object');
var util = require('util');

function Sun(initial_state) {
  screen_object.ScreenObject.call(this, initial_state);
}

util.inherits(Sun, screen_object.ScreenObject);

Sun.prototype.is_sun=function() {
  return true;
};


exports.Sun = Sun;
