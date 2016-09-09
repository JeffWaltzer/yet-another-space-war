var ScreenObject= require('./screen_object').ScreenObject;

exports.update= function(tick_rate) {
  this.life_left -= 1 / tick_rate;
  ScreenObject.prototype.update.call(this, tick_rate);
};

exports.live= function() {
  return this.life_left > 0;
};

