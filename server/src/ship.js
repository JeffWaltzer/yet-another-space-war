var underscore= require('underscore');
var vector= require('./vector');
var transforms= require('./transform');
var screen_object = require('./screen_object');
var util = require('util');

exports.Ship= function(initial_state) {
  screen_object.ScreenObject.call(this, initial_state);

  var self= this;

  self.rotation= initial_state.rotation || 0;
  self.points= initial_state.points;
  self.heading= initial_state.heading;
  self.socket = initial_state.socket;
  self.debug= initial_state.debug || false;
  self.velocity= new vector.Vector(initial_state.velocity || [0,0]);
  self.acceleration= initial_state.acceleration || 0;
  self.raw_gun_point = new vector.Vector(initial_state.gun_point || [0,0]);

  if (self.socket !== undefined && self.socket.on !== undefined) {
    self.socket.ship = self;
    self.socket.on('message', function(json_message) {
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
    });
  }


  self.update= function(rotation_rate, tick_rate, acceleration_rate) {
    self.heading += rotation_rate/tick_rate * self.rotation;

    self.velocity.add_to(new vector.Vector({magnitude: self.acceleration * acceleration_rate / tick_rate,
                                            heading: self.heading}));
    exports.Ship.super_.prototype.update.call(this, tick_rate);
  };

  self.fire= function(){
    return self.game.add_bullet({position: self.gun_point().coordinates});
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
