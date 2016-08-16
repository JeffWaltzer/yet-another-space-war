var ScreenObject= require('./screen_object').ScreenObject;
var MortalObject= require('./mortal_object');
var util = require('util');

function Bullet(initial_state) {
  ScreenObject.call(this, initial_state);

  var self = this;

  self.life_left = initial_state.life_left || 0;

  if (initial_state.ship) {
    self.ship( initial_state.ship);
  }
}

util.inherits(Bullet, ScreenObject);

Bullet.prototype.update= MortalObject.update;
Bullet.prototype.live = MortalObject.live;

Bullet.prototype.ship= function(new_value) {
    if(new_value)
        this._ship = new_value;
    return this._ship;
};

Bullet.prototype.is_bullet = function() {
    return true;
};

exports.Bullet= Bullet;

