var underscore= require('underscore');
var transforms= require('./transform');

exports.Ship= function(initial_state) {
  var self= this;

  self.rotation= initial_state.rotation || 0;
  self.points= initial_state.points;
  self.heading= initial_state.heading;
  self.socket = initial_state.socket;
  self.location= initial_state.location || [0,0];
  self.debug= initial_state.debug || false;
  self.velocity= initial_state.velocity || [0,0];
  self.acceleration= initial_state.acceleration || 0;
  self.game = initial_state.game || {
    top_edge: 600,
    right_edge: 800
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
      }
    });
  }

  self.outline= function() {
    var translation_out=  transforms.make_translation(self.location[0], self.location[1]);
    var rotation=         transforms.make_rotation(self.heading);
    var composite_transform= transforms.identity();

	  transforms.concatenate_transforms(composite_transform, translation_out, rotation);

    var returned_points= underscore.map(self.points,
    					                          function(p) {
    						                          var rv= [0, 0, 0];
    						                          transforms.apply_transform(rv, composite_transform, p);
						                              return [rv[0]/rv[2], rv[1]/rv[2]];
    					                          });
	  return returned_points;
  };

  self.update= function(rotation_rate, tick_rate, acceleration_rate) {
    self.heading += rotation_rate/tick_rate * self.rotation;

    self.velocity[0] += self.acceleration * acceleration_rate / tick_rate * Math.cos(self.heading);
    self.velocity[1] += self.acceleration * acceleration_rate / tick_rate * Math.sin(self.heading);

    self.location[0] += self.velocity[0] / tick_rate;
    self.location[1] += self.velocity[1] / tick_rate;


    self.location[0] = self.location[0] % self.game.right_edge;
    if (self.location[0] < 0) self.location[0] += self.game.right_edge;

    self.location[1] = self.location[1] % self.game.top_edge;
    if (self.location[1] < 0) self.location[1] += self.game.top_edge;

  };

};
