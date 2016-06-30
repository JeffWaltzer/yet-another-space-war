var meta= require('./meta');

var Player= meta.objectify(function() {
 this._score= 0;
});
exports.Player= Player;

Player.method('bump_score', function() {
    this._score++;
});

Player.method('on_message', function(json_message) {
    if (this.ship)
	return this.ship.on_message(json_message) ;
    return null;
});

Player.method('send_game_board', function(board) {
    if (!this.socket)
	return;

    var message= { screen_objects: board };

    if (this.ship)
	message.you= this.ship.id;

    this.socket.send(JSON.stringify(message));
});
