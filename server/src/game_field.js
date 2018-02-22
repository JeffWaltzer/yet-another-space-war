var _= require('underscore');

var Bullet=require('./bullet').Bullet;
var Ship=require('./ship').Ship;
var Sun=require('./sun').Sun;
var Fragment=require('./fragment').Fragment;
var NullPlayer= require('./null_player').NullPlayer;

var MathUtil= require('./math_util');
var Vector=require('./vector').Vector;
var physics = require('./physics');

function GameField(initial_state) {
  this._field_size = initial_state.field_size || new Vector([800,600]);
  this._screen_objects=[];
  this._G = initial_state.G || 1;
  this.next_id = 0;
}


GameField.accessor('field_size');
GameField.accessor('screen_objects');
GameField.accessor('G');


GameField.prototype.map_screen_objects= function(callback_function) {
  return _(this.screen_objects()).map(callback_function);
};

GameField.prototype.collisions_with= function(screenObject,start_index) {
  var to_remove = [];

  if (screenObject.ignores_collisions())
    return to_remove;

  for(var j = start_index; j< this.screen_objects().length; j++) {
    var screenObject2 = this.screen_objects()[j];

    if (screenObject2 === screenObject)
      continue;

    if (screenObject2.ignores_collisions())
      continue;

    var collided = MathUtil.collided(screenObject, screenObject2);
    if(collided) {
      to_remove.push(screenObject2);
    }
  }

  return to_remove;
};

GameField.prototype.add_screen_object= function(new_screen_object) {
  new_screen_object.id=  (this.next_id++).toString();
  this.screen_objects().push(new_screen_object);
  return new_screen_object;
};

GameField.prototype.random_position = function() {
  return [
    this.field_size().x() * Math.random(),
    this.field_size().y() * Math.random()
  ];
};

GameField.prototype.place_ship= function(ship) {
  var number_collided = this.collisions_with(ship, 0).length;
  while (number_collided > 0) {
    ship.position( new Vector(this.random_position()));
    number_collided = this.collisions_with(ship, 0).length;
  }
};

GameField.prototype.add_bullet= function(parameters) {
  return this.add_screen_object(new Bullet(parameters));
};

GameField.prototype.add_sun= function(parameters) {
  var new_sun = new Sun(parameters);
  new_sun.game_field = this;
  return this.add_screen_object(new_sun);
};

GameField.prototype.add_ship = function(parameters) {
  var defaultState = {
    game_field: this,
    rotation: 0,
    heading: 0,
    position: this.random_position()
  };

  if (parameters !== undefined)
    _(defaultState).extend(parameters);

  var new_ship = this.add_screen_object(new Ship(defaultState));

  if (!parameters || !parameters.position)
    this.place_ship(new_ship);

  return new_ship;
};

GameField.prototype.game_board= function() {
  return this.map_screen_objects(function(screen_object) {
    return screen_object.make_game_piece();
  });
};

GameField.prototype.remove_dead_objects = function () {
  this.screen_objects(
    _(this.screen_objects()).filter(
      function (screen_object) {
        return screen_object.live();
      }));
};

GameField.prototype.update_screen_objects= function(tick_rate) {
  physics.update_screen_objects(this.screen_objects(), tick_rate);
  this.handle_collisions();
  this.remove_dead_objects();
};

GameField.prototype.remove_screen_objects = function (to_remove) {
  this.screen_objects(_(this.screen_objects()).difference(to_remove));

  _(to_remove).each(function (screen_object) {
    if (screen_object.player()) {
      var the_player = screen_object.player();
      if (screen_object === the_player.ship) {
        the_player.ship = null;
        screen_object.player(new NullPlayer());
      }
    }
  });
};

GameField.prototype.remove_screen_object= function(to_remove) {
  this.screen_objects(_(this.screen_objects()).reject(
    function(screen_object) {
      return screen_object === to_remove;
    }));
};

GameField.prototype.maybe_explode= function(screen_object, o) {
  screen_object.explode();
  o.explode();
};

GameField.prototype.maybe_bump_score= function(screen_object, o) {
  screen_object.bump_player_score(o);
  o.bump_player_score(screen_object);
};

GameField.prototype.handle_collisions= function() {
  for (var i = 0; i < this.screen_objects().length; i++) {
    var screen_object = this.screen_objects()[i];
    var objects_collided_with = this.collisions_with(screen_object, i + 1);
    if (objects_collided_with.length > 0) {
      _(objects_collided_with).each(
        _(function (screen_object1, screen_object2) {
            this.maybe_bump_score(screen_object1, screen_object2);
            this.maybe_explode(screen_object1, screen_object2);
          }
        ).bind(this, screen_object));
    }
  }
};

GameField.prototype.ships= function() {
  return this.screen_objects_of_type(Ship);
};

GameField.prototype.bullets= function() {
  return this.screen_objects_of_type(Bullet);
};

GameField.prototype.fragments= function() {
  return this.screen_objects_of_type(Fragment);
};

GameField.prototype.suns= function() {
  return this.screen_objects_of_type(Sun);
};

GameField.prototype.screen_objects_of_type= function(type) {
  return _(this.screen_objects()).select(function(screen_object) {
    return screen_object instanceof type;
  });
};

exports.GameField= GameField;
