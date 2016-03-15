var underscore= require('underscore');

var bullet=require('./bullet');
var ship=require('./ship');
var ScreenObject= require('./screen_object').ScreenObject;

var MathUtil= require('./math_util');
var vector=require('./vector');


exports.GameField = function(initial_state) {
  this._field_size = initial_state.field_size || new vector.Vector([800,600]);
  this._screen_objects=[];
  this.next_id = 0;
};

exports.GameField.prototype.field_size = function () {
  return this._field_size;
};

exports.GameField.prototype.screen_objects= function(new_value) {
  if (new_value)
    this._screen_objects= new_value;
  return this._screen_objects;
};

exports.GameField.prototype.each_screen_object= function(callback_function) {
  return underscore.map(this.screen_objects(), callback_function);
};

exports.GameField.prototype.collisions_with= function(screenObject,start_index) {
  var to_remove = [];

  for(var j = start_index; j< this.screen_objects().length; j++) {
    var screenObject2 = this.screen_objects()[j];

    if (screenObject2 === screenObject)
      continue;

    var collided = MathUtil.collided(screenObject, screenObject2);
    if(collided) {
      to_remove.push(screenObject2);
    }
  }
  return to_remove;
};

exports.GameField.prototype.add_screen_object= function(new_screen_object) {
  new_screen_object.id=  (this.next_id++).toString();
  this.screen_objects().push(new_screen_object);
  return new_screen_object;
};

exports.GameField.prototype.random_position = function() {
  return [
    this.field_size().x() * Math.random(),
    this.field_size().y() * Math.random()
  ];
};

exports.GameField.prototype.place_ship= function(ship) {
  var number_collided = this.collisions_with(ship, 0).length;
  while (number_collided > 0) {
    ship.position( new vector.Vector(this.random_position()));
    number_collided = this.collisions_with(ship, 0).length;
  }
};


exports.GameField.prototype.add_bullet= function(game,parameters) {
  var defaultState = {
    game: game,
    rotation: 0,
    points: [[-1, -1], [-1, 1], [1, 1], [1, -1]],
    position: [0, 0]
  };

  if (parameters !== undefined)
    underscore.extend(defaultState ,parameters);

  return this.add_screen_object(new bullet.Bullet(defaultState));
};


exports.GameField.prototype.add_ship = function(game,parameters) {
  var defaultState = {
    game: game,
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

exports.GameField.prototype.game_board= function() {
    var outline_array= this.each_screen_object(function(screen_object) {
      return screen_object.make_game_piece();
    });
    var outlines= [];
    underscore.each(outline_array, function(outline, index) {
      outlines.push(outline);
    });
    return outlines;
  };

exports.GameField.prototype.remove_dead_objects= function() {
  this.screen_objects(
    underscore.filter(this.screen_objects(),
                      function(screen_object) {
                        return screen_object.live();
                      }));
};

exports.GameField.prototype.update_screen_objects= function(tick_rate, ship_rotation_rate, acceleration_rate) {
  this.each_screen_object(
    function(screen_object) {
      screen_object.update(
        tick_rate,
        ship_rotation_rate,
        acceleration_rate);
    });

  this.handle_collisions();
  this.remove_dead_objects();
};

exports.GameField.prototype.remove_screen_objects= function(to_remove) {
  this.screen_objects(underscore.difference(this.screen_objects(), to_remove));

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

exports.GameField.prototype.remove_screen_object= function(to_remove) {
  this.screen_objects(underscore.reject(this.screen_objects(),
      function(screen_object) {
        return screen_object === to_remove;
      }));
};

exports.GameField.prototype.dead_objects= function() {
  var to_remove = [];
  for (var i = 0; i < this.screen_objects().length; i++) {
    var screen_object = this.screen_objects()[i];
    var objects_collided_with = this.collisions_with(screen_object, i + 1);

    if (objects_collided_with.length > 0) {
      underscore.each(objects_collided_with, underscore.bind(this.maybe_bump_score,
							     this,
							     screen_object));
      to_remove.push(screen_object);
    }
    to_remove = to_remove.concat(objects_collided_with);
  }
  return to_remove;
};

exports.GameField.prototype.maybe_bump_score= function(screen_object, o) {
  if (screen_object.is_bullet() && !o.is_bullet() && screen_object.player())
    screen_object.player().bump_score();
  else if (o.is_bullet() && !screen_object.is_bullet() && o.player())
    o.player().bump_score();
};

exports.GameField.prototype.handle_collisions= function() {
  this.remove_screen_objects(this.dead_objects());
};

