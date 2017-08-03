function Player(color) {
  this._score= 0;
  this._color= color || 'red';
  this._send_game_board= true;
}

Player.resurrection_time= 1000;

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
    this.ship.on_message(json_message) ;
};


Player.prototype.color= function() {
  return this._color;
};

Player.prototype.send_game_board_p= function(new_value) {
    if (new_value !== undefined)
      this._send_game_board= new_value;
    return this._send_game_board;
};

Player.prototype.add_ship= function() {
};

exports.Player= Player;
