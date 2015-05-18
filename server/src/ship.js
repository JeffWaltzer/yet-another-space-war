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

  self.outline= function() {
    var translation_out=  transforms.make_translation(self.location[0], self.location[1]);
    var rotation=         transforms.make_rotation(self.heading);
    var composite_transform= transforms.identity();

	  transforms.concatenate_transforms(composite_transform, translation_out, rotation);

    // DEBUG
    if (self.debug) {
      console.log("Ship#outline(): points:", self.points);
      console.log("    translation_out:", translation_out);
      console.log("    rotation:", rotation);
      console.log("    composite_transform:", composite_transform);
    }

    var returned_points= underscore.map(self.points,
    					                          function(p) {
    						                          var rv= [0, 0, 0];
    						                          transforms.apply_transform(rv, composite_transform, p);
						                              return [rv[0]/rv[2], rv[1]/rv[2]];
    					                          });
    // DEBUG
    if (self.debug) {
      console.log("    returned_points:", returned_points);
    }

	  return returned_points;
  };

  self.update= function(rotation_rate, tick_rate, acceleration_rate) {
    //DEBUG
    if (self.debug) {
      console.log("****************************************************************");
      console.log("ship.update: rotation_rate: ", rotation_rate);
      console.log("ship.update: tick_rate: ", tick_rate);
      console.log("ship.update: acceleration_rate: ", acceleration_rate);
      console.log("ship.update: velocity: ", self.velocity);
      console.log("ship.update: heading: ", self.heading);
      console.log("ship.update: rotation: ", self.rotation);
    }

    self.heading += rotation_rate/tick_rate * self.rotation;
    self.velocity[0] += self.acceleration * acceleration_rate / tick_rate * Math.cos(self.heading);
    self.velocity[1] += self.acceleration * acceleration_rate / tick_rate * Math.sin(self.heading);
    self.location[0] += self.velocity[0] / tick_rate;
    self.location[1] += self.velocity[1] / tick_rate;

    //DEBUG
    if (self.debug) {
      console.log("================================================================");
      console.log("ship.update: rotation_rate: ", rotation_rate);
      console.log("ship.update: tick_rate: ", tick_rate);
      console.log("ship.update: acceleration_rate: ", acceleration_rate);
      console.log("ship.update: velocity: ", self.velocity);
      console.log("ship.update: heading: ", self.heading);
    }
  };

};
