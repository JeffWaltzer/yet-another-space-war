var underscore = require('underscore');
var vector= require('./vector');
var transforms= require('./transform');
var screen_object = require('./screen_object');
var util = require('util');

exports.Ship= function(initial_state) {
  screen_object.ScreenObject.call(this, initial_state);

  var self= this;

  self.rotation= initial_state.rotation || 0;
  self.acceleration= initial_state.acceleration || 0;
  self.raw_gun_point = new vector.Vector(initial_state.gun_point || [0,0]);

};

util.inherits(exports.Ship, screen_object.ScreenObject);

var shape = [[5, 0], [1.24, 3.80], [-4.85, 3.53], [-2.43, -1.76], [1.85, -2.85]];
var fragmentShapes = [
  underscore.map(shape, function (point) {
    return [point[0] * 1, point[1] * 1];
  }),
  underscore.map(shape, function (point) {
    return [point[0] * 3, point[1] * 2];
  }),
  underscore.map(shape, function (point) {
    return [point[0] * 1, point[1] * 4];
  })
];

exports.Ship.fragment_shapes = fragmentShapes;

exports.Ship.prototype.on_message = function(json_message) {
  var self=this;
  var message = JSON.parse(json_message);

  switch (message.command) {
  case 'rotate_left':
    self.angular_velocity= -this.game.ship_rotation_rate;
    break;
  case 'rotate_right':
    self.angular_velocity= this.game.ship_rotation_rate;
    break;
  case 'rotate_stop':
      self.angular_velocity= 0;
    break;
  case 'thrust_on':
    self.acceleration = 1;
    break;
  case 'thrust_off':
    self.acceleration = 0;
    break;
  case 'fire':
    self.fire();
    break;
  case 'clone':
    self.clone();
  }
};


exports.Ship.prototype.update= function(tick_rate, rotation_rate, acceleration_rate) {
  var self = this;
  exports.Ship.super_.prototype.update.call(this, tick_rate);
  self.velocity.add_to(new vector.Vector({magnitude: self.acceleration * acceleration_rate / tick_rate,
    heading: self.heading}));
};



exports.Ship.prototype.gun_point= function() {
  var self = this;
  var transformed_point= [0,0,1];
  transforms.apply_transform(transformed_point, self.ship_to_game_transform(), self.raw_gun_point.coordinates);
  return new vector.Vector(transformed_point);
};

exports.Ship.prototype.random_in_range = function (lower, upper) {
  return (upper-lower) * Math.random() + lower;
};

exports.Ship.prototype.fragment_parameters = function (shape_index) {
  return {
    game: this.game,
    position: this.position(),
    velocity: [
      this.velocity.x() + this.random_in_range(-50, 50),
      this.velocity.y() + this.random_in_range(-50, 50)
    ],
    angular_velocity: this.random_in_range(-10, 10),
    life_left: 3,
    points: fragmentShapes[(shape_index) % fragmentShapes.length]
  };
};

exports.Ship.prototype.explode = function() {
  this.game.game_field.remove_screen_object(this);
  var fragments= [];
  var number_of_fragments= Math.floor(this.random_in_range(2,12));
  var shape_index = 0;
    for (var i= 0; i < number_of_fragments; i++) {
      var fragment = this.game.game_field.add_fragment(
          this.game,
          this.fragment_parameters(shape_index++)
      );
      fragments.push(fragment);
    }
  return fragments;
};

exports.Ship.prototype.fire= function(){
  var self=this;
  var bullet_speed= self.game.bullet_speed;
  var bullet_parameters= {
    life_left: self.game.bullet_life_time,
    position: self.gun_point().coordinates,
    velocity: [self.velocity.x() + bullet_speed * Math.cos(self.heading),
      self.velocity.y() + bullet_speed * Math.sin(self.heading)],
    ship: self,
    player: self.player()
  };
  return self.game.game_field.add_bullet(self.game,bullet_parameters);
};

exports.Ship.prototype.clone= function() {
  this.game.add_ship();
};

exports.Ship.prototype.is_ship = function() {
  return true;
};

exports.Ship.prototype.score= function() {
  if (!this.player())
    return null;
  return this.player()._score;
};
