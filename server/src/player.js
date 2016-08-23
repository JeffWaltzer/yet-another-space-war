function Player() {
  this._score= 0;
}

Player.prototype.bump_score= function() {
  this._score++;
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

Player.prototype.send_game_board= function(board) {
  if (!this.socket)
    return;

  var message= { screen_objects: board };

  if (this.ship)
    message.you= this.ship.id;

  this.socket.send(JSON.stringify(message));
};

exports.Player= Player;
