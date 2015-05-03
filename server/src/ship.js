var underscore= require('underscore');

var concatenate_transforms= function(result, a, b) {
  for (var i= 0; i < 3; i++)
	  for (var j= 0; j < 3; j++) {
	    result[i][j]= 0;
	    for (var k= 0; k < 3; k++)
		    result[i][j] += a[i][k]*b[k][j];
	  }
  return result;
};

var apply_transform= function(result, a, v) {
  for (var i= 0; i < 3; i++)
	  result[i]= a[i][0] * v[0] +
		a[i][1] * v[1] +
		a[i][2];

  return result;
};

var make_translation= function(x_offset, y_offset) {
  return [[1, 0, x_offset],
    			[0, 1, y_offset],
    			[0, 0, 1]];
};

var make_rotation= function(angle) {
  return [[Math.cos(angle), -Math.sin(angle), 0],
    		  [Math.sin(angle),  Math.cos(angle), 0],
    		  [0, 0, 1]];
};

exports.Ship= function(initial_state) {
  var self= this;

  self.rotation= initial_state.rotation;
  self.points= initial_state.points;
  self.heading= initial_state.heading;
  self.socket = initial_state.socket;
  self.location= initial_state.location || [0,0];

  self.outline= function() {
    var translation_out=  make_translation(-self.location[0], -self.location[1]);
    var translation_back= make_translation(self.location[0],   self.location[1]);
    var rotation=         make_rotation(self.heading);

    var tmp= [[0, 0, 0],
    		      [0, 0, 0],
    		      [0, 0, 0]];

    var composite_transform= [[1, 0, 0],
    				                  [0, 1, 0],
    				                  [0, 0, 1]];

    concatenate_transforms(tmp, translation_back, rotation);
	  concatenate_transforms(composite_transform, tmp, translation_out);

    var returned_points= underscore.map(self.points,
    					                          function(p) {
    						                          var rv= [0, 0, 0];
    						                          apply_transform(rv, composite_transform, p);
						                              return [rv[0]/rv[2], rv[1]/rv[2]];
    					                          });
	  return returned_points;
  };
};
