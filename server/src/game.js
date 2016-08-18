var underscore= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');
var vector=require('./vector');
var Player= require('./player').Player;
var GameField = require('./game_field').GameField;
var ScreenObject= require('./screen_object').ScreenObject;

function Game(initial_state) {
  var self = this;
  if (!initial_state)
    initial_state= {};

  self.game_field= new GameField(initial_state);
  self.bullet_speed= initial_state.bullet_speed || 7;

  self.bullet_life_time = initial_state.bullet_life_time || 3;
  self.tick_rate= initial_state.tick_rate;

  self.ship_rotation_rate= initial_state.ship_rotation_rate;
  self.acceleration_rate= initial_state.acceleration_rate;

  self.players= {};

  self.tick= function() {
    self.game_field.update_screen_objects(self.tick_rate);
    self.send_game_board(self.game_field.game_board());
  };

  self.start_ticking= function(tick_rate) {
    if (tick_rate!==0)
      setInterval(self.tick, 1000/tick_rate);
  };
}

Game.prototype.send_game_board= function(new_board) {
    underscore.each(this.players, function(player) {
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

Game.prototype.add_ship = function(parameters) {
  return this.game_field.add_ship(this,parameters);
};

exports.Game= Game;
