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

exports.Bullet = Bullet;

util.inherits(Bullet, ScreenObject);

Bullet.mixin(MortalObject);

Bullet.accessor('ship');

Bullet.method('is_bullet', function() {return true;});

