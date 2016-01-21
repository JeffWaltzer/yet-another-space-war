var underscore= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');
var vector=require('./vector');
var Player= require('./player').Player;
var GameField = require('./game_field').GameField;

exports.Game=function(initial_state) {
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

  self.handle_collisions= function() {
    var maybe_bump_score= function(screen_object, o) {
      if (screen_object.is_bullet() && !o.is_bullet() && screen_object.player())
        screen_object.player().bump_score();
      else if (o.is_bullet() && !screen_object.is_bullet() && o.player())
        o.player().bump_score();
    };

    var to_remove = [];
    for (var i = 0; i < self.game_field.screen_objects().length; i++) {
      var screen_object = self.game_field.screen_objects()[i];
      var objects_collided_with = self.game_field.collisions_with(screen_object, i + 1);

      if (objects_collided_with.length > 0) {
        underscore.each(objects_collided_with, underscore.bind(maybe_bump_score, this, screen_object));
        to_remove.push(screen_object);
      }
      to_remove = to_remove.concat(objects_collided_with);
    }

    self.game_field.screen_objects(underscore.difference(self.game_field.screen_objects(), to_remove));

    underscore.each(to_remove, function(screen_object) {
      if (screen_object.player()) {
        var the_player= screen_object.player();
        if (screen_object === the_player.ship) {
          the_player.ship = null;
          screen_object.player(null);
        }
      }
    });
  };

  function make_game_piece(screen_object) {
    return {
      outline: screen_object.outline(),
      id: screen_object.id,
      score: screen_object.score(),
      position: [
        screen_object.position().x(),
        screen_object.position().y()
      ]
    };

  }

  self.game_board= function() {
    var outline_array= this.game_field.each_screen_object(make_game_piece);
    var outlines= [];
    underscore.each(outline_array, function(outline, index) {
      outlines.push(outline);
    });
    return outlines;
  };

  function send_game_board_to_player(board, player) {
    if (!player.socket)
      return;

    var message= { screen_objects: board };

    if (player.ship)
      message.you= player.ship.id;

    player.socket.send(JSON.stringify(message));
  }

  self.send_game_board= function(new_board) {
    this.each_player(underscore.bind(send_game_board_to_player, this, new_board));
  };

  self.tick= function() {
    self.update_screen_objects();
    self.send_game_board(self.game_board());
  };

  self.start_ticking= function(tick_rate) {
    if (tick_rate!==0)
      setInterval(self.tick, 1000/tick_rate);
  };
};

exports.Game.prototype.remove_dead_objects= function() {
    this.game_field.screen_objects(underscore.filter(this.game_field.screen_objects(),
                                          function(screen_object){
                                            return !screen_object.dead();
                                          }));
};

exports.Game.prototype.update_screen_objects= function() {
  var self= this;

  this.game_field.each_screen_object(
      function(screen_object) {
        screen_object.update(
          self.tick_rate,
          self.ship_rotation_rate,
          self.acceleration_rate);
      });

    this.handle_collisions();
    this.remove_dead_objects();
  };

exports.Game.prototype.add_player= function(player_id) {
  var new_player= new Player();
  this.players[player_id]= new_player;
  return new_player;
};

exports.Game.prototype.connect_socket= function(player_id, socket) {
  this.players[player_id].socket = socket;
};

exports.Game.prototype.connect_ship= function(player_id, ship) {
  var the_player= this.players[player_id];
  the_player.ship= ship;
  ship.player(the_player);
};

exports.Game.prototype.add_ship = function(parameters) {
  return this.game_field.add_ship(this,parameters);
};

exports.Game.prototype.each_player= function(callback_function) {
  underscore.each(this.players, callback_function);
};
