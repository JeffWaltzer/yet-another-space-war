var underscore= require('underscore');

var bullet=require('./bullet');
var ship=require('./ship');

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
