function Player(color) {
  this._score= 0;
  this._color= color || 'red';
  this._send_game_board= true;
}

Player.resurrection_time= 3000;

Player.prototype.arrange_for_resurrection= function(game_field) {
  setTimeout(
    this.resurrect,
    Player.resurrection_time,
    game_field,
    this
  );
};

Player.prototype.resurrect= function(game_field, player) {
  var new_ship = game_field.add_ship({heading: 2 * Math.PI * Math.random()});
  player.connect_ship(new_ship);
};

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

Player.prototype.add_ship= function(game_field) {
    var new_ship= game_field.add_ship();
    this.connect_ship( new_ship);
    return new_ship;
};

Player.prototype.connect_ship = function (ship) {
  this.ship = ship;
  ship.color(this.color());
  ship.player(this);
};

exports.Player= Player;
