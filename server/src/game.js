var _= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');
var vector=require('./vector');
var Player= require('./player').Player;
var GameField = require('./game_field').GameField;
var ScreenObject= require('./screen_object').ScreenObject;

function Game(initial_state) {
  if (!initial_state)
    initial_state= {};

  this.game_field= new GameField(initial_state);
  this.bullet_speed= initial_state.bullet_speed || 7;

  this.bullet_lifetime = initial_state.bullet_lifetime || 3;
  this.tick_rate= initial_state.tick_rate;

  this.acceleration_rate= initial_state.acceleration_rate;

  this.players= {};
}

Game.prototype.tick= function() {
    this.game_field.update_screen_objects(this.tick_rate);
    this.send_game_board(this.game_field.game_board());
};

Game.prototype.start_ticking= function(tick_rate) {
    if (tick_rate!==0)
	setInterval(_(this.tick).bind(this),
		    1000/tick_rate);
};

Game.prototype.send_game_board= function(new_board) {
    _(this.players).each(function(player) {
	player.send_game_board(new_board);
    });
};

Game.prototype.add_player= function(player_id) {
  var new_player= new Player();
  this.players[player_id]= new_player;
  return new_player;
};

Game.prototype.connect_socket= function(player_id, socket) {
  this.players[player_id].socket = socket;
};

Game.prototype.connect_ship= function(player_id, ship) {
  var the_player= this.players[player_id];
  the_player.ship= ship;
  ship.player(the_player);
};

exports.Game= Game;
