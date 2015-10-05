exports.Player= function() {
  this._score= 0;
};

exports.Player.prototype.bump_score= function() {
  this._score++;
};
