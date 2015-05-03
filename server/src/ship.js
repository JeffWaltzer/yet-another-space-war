var underscore= require('underscore');
var transforms= require('./transform');

exports.Ship= function(initial_state) {
  var self= this;

  self.rotation= initial_state.rotation;
  self.points= initial_state.points;
  self.heading= initial_state.heading;
  self.socket = initial_state.socket;
  self.location= initial_state.location || [0,0];

  self.outline= function() {
    var translation_out=  transforms.make_translation(-self.location[0], -self.location[1]);
    var translation_back= transforms.make_translation(self.location[0],   self.location[1]);
    var rotation=         transforms.make_rotation(self.heading);

    var tmp= [[0, 0, 0],
    		      [0, 0, 0],
    		      [0, 0, 0]];

    var composite_transform= [[1, 0, 0],
    				                  [0, 1, 0],
    				                  [0, 0, 1]];

    transforms.concatenate_transforms(tmp, translation_back, rotation);
	  transforms.concatenate_transforms(composite_transform, tmp, translation_out);

    var returned_points= underscore.map(self.points,
    					                          function(p) {
    						                          var rv= [0, 0, 0];
    						                          transforms.apply_transform(rv, composite_transform, p);
						                              return [rv[0]/rv[2], rv[1]/rv[2]];
    					                          });
	  return returned_points;
  };
};
