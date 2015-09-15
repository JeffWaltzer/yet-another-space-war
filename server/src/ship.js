var underscore = require('underscore');
var vector= require('./vector');
var transforms= require('./transform');
var screen_object = require('./screen_object');
var util = require('util');

exports.Ship= function(initial_state) {
  screen_object.ScreenObject.call(this, initial_state);

  var self= this;

  self.rotation= initial_state.rotation || 0;
  self.heading= initial_state.heading ||0;
  self.socket = initial_state.socket;
  self.acceleration= initial_state.acceleration || 0;
  self.raw_gun_point = new vector.Vector(initial_state.gun_point || [0,0]);

  self.update= function(tick_rate, rotation_rate, acceleration_rate) {
    self.heading += rotation_rate/tick_rate * self.rotation;
    self.velocity.add_to(new vector.Vector({magnitude: self.acceleration * acceleration_rate / tick_rate,
                                            heading: self.heading}));
    exports.Ship.super_.prototype.update.call(this, tick_rate);
  };

  self.fire= function(){
    var bullet_speed= self.game.bullet_speed;
    var bullet_parameters= {
      life_left: self.game.bullet_life_time,
      position: self.gun_point().coordinates,
      velocity: [self.velocity.x() + bullet_speed * Math.cos(self.heading),
                 self.velocity.y() + bullet_speed * Math.sin(self.heading)]
    };
    return self.game.add_bullet(bullet_parameters);
  };

  self.ship_to_game_transform= function() {
    var rotation=            transforms.make_rotation(this.heading);
    var composite_transform= transforms.identity();
    var super_transform= screen_object.ScreenObject.prototype.ship_to_game_transform.call(this);
    
    return transforms.concatenate_transforms(composite_transform,
                                             super_transform,
                                             rotation);
  };

  self.gun_point= function() {
    var transformed_point= [0,0,1];
    transforms.apply_transform(transformed_point, self.ship_to_game_transform(), self.raw_gun_point.coordinates);
    return new vector.Vector(transformed_point);
  };
};

util.inherits(exports.Ship, screen_object.ScreenObject);

exports.Ship.prototype.on_message = function(json_message) {
  var self=this;
  var message = JSON.parse(json_message);

  switch (message.command) {
    case 'rotate_left':
      self.rotation = -1;
      break;
    case 'rotate_right':
      self.rotation = 1;
      break;
    case 'rotate_stop':
      self.rotation = 0;
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
  }
};
