var underscore= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');
var vector=require('./vector');
var Player= require('./player').Player;
var MathUtil= require('./math_util');
var GameField = require('./game_field').GameField;

exports.Game=function(initial_state) {
  var self = this;
  if (!initial_state)
    initial_state= {};

  self.game_field= new GameField(initial_state);
  self.bullet_speed= initial_state.bullet_speed || 7;

  self.bullet_life_time = initial_state.bullet_life_time || 3;

  self.players= {};
  self._screen_objects=[];
  self.next_id = 0;

  function each_screen_object(callback_function) {
    return underscore.map(self.screen_objects(), callback_function);
  }

  function each_player(callback_function) {
    underscore.each(self.players, callback_function);
  }

  function remove_dead_objects() {
    self.screen_objects(underscore.filter(self.screen_objects(),
                                          function(screen_object){
                                            return !screen_object.dead();
                                          }));
  }

  self.collisions_with= function(screenObject,start_index) {
    var to_remove = [];

    for(var j = start_index; j< self.screen_objects().length; j++) {
      var screenObject2 = self.screen_objects()[j];

      if (screenObject2 === screenObject)
        continue;

      var collided = MathUtil.collided(screenObject, screenObject2);
      if(collided) {
        to_remove.push(screenObject2);
      }
    }
    return to_remove;
  };

  self.handle_collisions= function() {
    var maybe_bump_score= function(screen_object, o) {
      if (screen_object.is_bullet() && !o.is_bullet() && screen_object.player())
        screen_object.player().bump_score();
      else if (o.is_bullet() && !screen_object.is_bullet() && o.player())
        o.player().bump_score();
    };

    var to_remove = [];
    for (var i = 0; i < self.screen_objects().length; i++) {
      var screen_object = self.screen_objects()[i];
      var objects_collided_with = self.collisions_with(screen_object, i + 1);

      if (objects_collided_with.length > 0) {
        underscore.each(objects_collided_with, underscore.bind(maybe_bump_score, this, screen_object));
        to_remove.push(screen_object);
      }
      to_remove = to_remove.concat(objects_collided_with);
    }

    self.screen_objects(underscore.difference(self.screen_objects(), to_remove));

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

  function update_screen_objects() {
    each_screen_object(
      function(screen_object) {
        screen_object.update(
          initial_state.tick_rate,
          initial_state.ship_rotation_rate,
          initial_state.acceleration_rate);
      });

    self.handle_collisions();

    remove_dead_objects();
  }

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
    var outline_array= each_screen_object(make_game_piece);
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
    each_player(underscore.bind(send_game_board_to_player, this, new_board));
  };

  self.tick= function() {
    update_screen_objects();
    self.send_game_board(self.game_board());
  };

  self.start_ticking= function(tick_rate) {
    if (tick_rate!==0)
      setInterval(self.tick, 1000/tick_rate);
  };

};

exports.Game.prototype.screen_objects= function(new_value) {
  if (new_value)
    this._screen_objects= new_value;
  return this._screen_objects;
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

exports.Game.prototype.add_screen_object= function(new_screen_object) {
  new_screen_object.id=  (this.next_id++).toString();
  this.screen_objects().push(new_screen_object);
  return new_screen_object;
};

exports.Game.prototype.field_size = function() {
  return this.game_field.field_size();
};

exports.Game.prototype.random_position = function() {
  return [
    this.field_size().x() * Math.random(),
    this.field_size().y() * Math.random()
  ];
};

exports.Game.prototype.add_ship = function(parameters) {
  var defaultState = {
    game: this,
    rotation: 0,
    points: [[-10, 10], [20, 0], [-10, -10], [0, 0]],
    gun_point: [21,0],
    heading: 0,
    position: this.random_position()
  };

  if (parameters !== undefined)
    underscore.extend(defaultState ,parameters);

  var new_ship = this.add_screen_object(new ship.Ship(defaultState));

  if (!parameters || !parameters.position)
    this.place_ship(new_ship);

  return new_ship;
};

exports.Game.prototype.place_ship= function(ship) {    
  var number_collided = this.collisions_with(ship, 0).length;
  while (number_collided > 0) {
    ship.position( new vector.Vector(this.random_position()));
    number_collided = this.collisions_with(ship, 0).length;
  }
};

exports.Game.prototype.add_bullet= function(parameters){
  var defaultState = {
    game: this,
    rotation: 0,
    points: [[-1, -1], [-1, 1], [1, 1], [1, -1]],
    position: [0, 0]
  };

  if (parameters !== undefined)
    underscore.extend(defaultState ,parameters);

  return this.add_screen_object(new bullet.Bullet(defaultState));
};

