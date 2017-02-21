function Player() {
  this._score= 0;
}

Player.prototype.bump_score= function(score_bump) {
  this._score += score_bump;
};

Player.prototype.score=function (new_value) {
  if (new_value)
    this._score=new_value;
  return this._score;
};


Player.prototype.on_message = function(json_message) {
  if (this.ship)
    return this.ship.on_message(json_message) ;
  return null;
};


Player.prototype.color= function() {
  return 'green';
};

exports.Player= Player;
