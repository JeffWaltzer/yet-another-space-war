var underscore = require('underscore');
var vector= require('./vector');
var transforms= require('./transform');
var screen_object = require('./screen_object');
var util = require('util');
var math_util = require('./math_util');
var fragment_maker = require('./fragment_maker');

exports.Ship= function(initial_state) {
  screen_object.ScreenObject.call(this, initial_state);

  var self= this;

  self.rotation= initial_state.rotation || 0;
  self.acceleration= initial_state.acceleration || 0;
  self.raw_gun_point = new vector.Vector(initial_state.gun_point || [0,0]);

};

util.inherits(exports.Ship, screen_object.ScreenObject);


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

var random_in_range = function (lower, upper) {
  return (upper-lower) * Math.random() + lower;
};

exports.Ship.prototype.fragment_parameters = function (shape_index) {
  return {
    game: this.game,
    position: this.position(),
    velocity: [
      this.velocity.x() + random_in_range(-50, 50),
      this.velocity.y() + random_in_range(-50, 50)
    ],
    angular_velocity: random_in_range(-10, 10),
    life_left: 3,
    points: fragment_maker.fragment_shapes[(shape_index) % fragment_maker.fragment_shapes.length]
  };
};

exports.Ship.prototype.add_fragment= function(shape_index) {
    return this.game.game_field.add_fragment(
        this.game,
        this.fragment_parameters(shape_index++)
    );
};

exports.Ship.prototype.add_fragments= function() {
    var number_of_fragments= Math.floor(random_in_range(2,12));
    var fragments= [];
    for (var i= 0; i < number_of_fragments; i++) {
        fragments.push(this.add_fragment(i));
    }
    return fragments;
};

exports.Ship.prototype.explode = function() {
    this.game.game_field.remove_screen_object(this);
    return this.add_fragments();
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
