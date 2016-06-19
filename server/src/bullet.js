var meta= require('./meta');
var ScreenObject= require('./screen_object').ScreenObject;
var MortalObject= require('./mortal_object');
var util = require('util');

var Bullet= meta.objectify(function(initial_state) {
    ScreenObject.call(this, initial_state);

    var self = this;

    self.life_left = initial_state.life_left || 0;

    if (initial_state.ship) {
	self.ship( initial_state.ship);
    }
});

util.inherits(Bullet, ScreenObject);

exports.Bullet = Bullet;

Bullet.mixin(MortalObject);

Bullet.method('ship',
	      function(new_value) {
		  if(new_value) {
		      this._ship = new_value;
		  }
		  return this._ship;
	      });

Bullet.method('is_bullet', function() {return true;});

