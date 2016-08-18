var underscore = require('underscore');
var vector= require('./vector');
var transforms= require('./transform');
var screen_object = require('./screen_object');
var util = require('util');
var math_util = require('./math_util');
var fragment_maker = require('./fragment_maker');
var Fragment= require('./fragment').Fragment;


function Ship(initial_state) {
  screen_object.ScreenObject.call(this, initial_state);

  var self= this;

  self.rotation= initial_state.rotation || 0;
  self.acceleration= initial_state.acceleration || 0;
  self.raw_gun_point = new vector.Vector(initial_state.gun_point || [0,0]);

}

util.inherits(Ship, screen_object.ScreenObject);


Ship.prototype.on_message = function(json_message) {
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
    self.acceleration = 30;
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


Ship.prototype.update= function(tick_rate) {
  var self = this;
  Ship.super_.prototype.update.call(this, tick_rate);
  self.velocity.add_to(new vector.Vector({magnitude: self.acceleration / tick_rate,
    heading: self.heading}));
};



Ship.prototype.gun_point= function() {
  var self = this;
  var transformed_point= [0,0,1];
  transforms.apply_transform(transformed_point, self.ship_to_game_transform(), self.raw_gun_point.coordinates);
  return new vector.Vector(transformed_point);
};

Ship.prototype.explode = function() {
    this.game.game_field.remove_screen_object(this);
    return fragment_maker.add_fragments(this.game, this.game.game_field, this.position(), this.velocity);
};

Ship.prototype.fire= function(){
  var self=this;
  var bullet_speed= self.game.bullet_speed;
  var bullet_parameters= {
    game: self.game,
    life_left: self.game.bullet_life_time,
    position: self.gun_point().coordinates,
    velocity: [self.velocity.x() + bullet_speed * Math.cos(self.heading),
               self.velocity.y() + bullet_speed * Math.sin(self.heading)],
    ship: self,
    player: self.player()
  };
  return self.game.game_field.add_bullet(bullet_parameters);
};

Ship.prototype.clone= function() {
  this.game.add_ship();
};

Ship.prototype.is_ship = function() {
  return true;
};

Ship.prototype.score= function() {
  if (!this.player())
    return null;
  return this.player()._score;
};


exports.Ship= Ship;
