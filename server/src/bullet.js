var ScreenObject= require('./screen_object').ScreenObject;
var MortalObject= require('./mortal_object');
var util = require('util');

var Polygon= require('./polygon').Polygon;

function Bullet(initial_state) {
  initial_state.shape= [new Polygon([[-1, -1], [-1, 1], [1, 1], [1, -1]])];

  initial_state.mass = 0.1;

  ScreenObject.call(this, initial_state);

  this.life_left = initial_state.life_left || 0;

  if (initial_state.ship) {
    this.ship( initial_state.ship);
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

Bullet.prototype.bump_player_score = function (other_object) {
  this.player().bump_score(other_object.point_value());
};

exports.Bullet= Bullet;

