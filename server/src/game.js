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
  this.tick_rate= initial_state.tick_rate;

  this.players= [];
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


Game.prototype.send_player_game_board= function(board, player) {
  if (!player.socket)
    return;

  var message= {
    polygons: board,
    field_size: this.game_field.field_size().coordinates,
  };

  player.socket.send(JSON.stringify(message));
};



Game.prototype.send_game_board= function(new_board) {
  var self=this;
  _(this.players).each(function(player) {
    if (player.send_game_board_p())
      self.send_player_game_board(new_board,player);
  });
};

Game.player_colors = ['green', 'magenta', 'yellow', 'palegreen', 'purple', 'orange', 'cyan', 'blue'];

Game.prototype.add_player= function() {
  var new_player= new Player(Game.player_colors[this.players.length]);
  this.players.push(new_player);
  return new_player;
};

Game.prototype.connect_socket= function(player, socket) {
  player.socket = socket;
};

Game.prototype.connect_ship= function(player, ship) {
  player.connect_ship(ship);
};


Game.prototype.on_close = function (player) {
  this.game_field.remove_screen_object(player.ship);
  this.players = _(this.players).reject(function (p) {
    return p === player;
  });
};

exports.Game= Game;
