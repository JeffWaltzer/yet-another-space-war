var underscore= require('underscore');
var vector= require('./vector');
var screen_object = require('./screen_object');
var util = require('util');

exports.Ship= function(initial_state) {
  var self= this;

  self.rotation= initial_state.rotation || 0;
  self.points= initial_state.points;
  self.heading= initial_state.heading;
  self.socket = initial_state.socket;
  self.location= new vector.Vector(initial_state.location || [0,0]);
  self.debug= initial_state.debug || false;
  self.velocity= new vector.Vector(initial_state.velocity || [0,0]);
  self.acceleration= initial_state.acceleration || 0;
  self.game = initial_state.game || {
    field_size: new vector.Vector([800,600])
  };

  if (self.socket) {
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

    self.location.add_to(self.velocity.divide(tick_rate));
    self.location.clip_to(self.game.field_size);
  };

  self.fire= function(){
    return self.game.add_bullet();
  };

  self.gun_point=function() {
    return new vector.Vector([0,0]);
  };
};

util.inherits(exports.Ship, screen_object.ScreenObject);
