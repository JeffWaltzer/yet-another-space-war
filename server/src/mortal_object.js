var meta= require('./meta');
var ScreenObject= require('./screen_object').ScreenObject;

meta.modularize(exports);

exports.method('update',
	       function(tick_rate, rotation_rate, acceleration_rate) {
		   this.life_left -= 1 / tick_rate;
		   ScreenObject.prototype.update.call(this, tick_rate);
	       });

exports.method('live',
	       function(tick_rate, rotation_rate, acceleration_rate) {
		   return this.life_left > 0;
	       });

