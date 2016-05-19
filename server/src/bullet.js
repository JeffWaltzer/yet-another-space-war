var ScreenObject= require('./screen_object').ScreenObject;
var MortalObject= require('./mortal_object');
var util = require('util');

exports.Bullet = function(initial_state) {
  ScreenObject.call(this, initial_state);

  var self = this;

  self.life_left = initial_state.life_left || 0;

  if (initial_state.ship) {
    self.ship( initial_state.ship);
  }
};

util.inherits(exports.Bullet, ScreenObject);

exports.Bullet.prototype.ship= function(new_value) {
    if(new_value) {
        this._ship = new_value;
    }
    return this._ship;
};

exports.Bullet.prototype.is_bullet = function() {
    return true;
};

exports.Bullet.prototype.update= MortalObject.update;
exports.Bullet.prototype.live = MortalObject.live;

