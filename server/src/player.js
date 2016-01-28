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

exports.Player.prototype.send_game_board= function(board) {
  if (!this.socket)
    return;

  var message= { screen_objects: board };

  if (this.ship)
    message.you= this.ship.id;

  this.socket.send(JSON.stringify(message));
};
