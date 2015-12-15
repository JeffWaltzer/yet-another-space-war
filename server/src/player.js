exports.Player= function() {
  this._score= 0;
};

exports.Player.prototype.bump_score= function() {
  this._score++;
};

exports.Player.prototype.on_message = function(json_message) {
  if (this.ship)
    return this.ship.on_message(json_message) ;
  return null;
};
