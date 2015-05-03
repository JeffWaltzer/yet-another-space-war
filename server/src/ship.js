var underscore= require('underscore');

var matrix_product= function(result, a, b) {
    for (var i= 0; i < 3; i++)
	for (var j= 0; j < 3; j++) {
	    result[i][j]= 0;
	    for (var k= 0; k < 3; k++)
		result[i][j] += a[i][k]*b[k][j];
	    }
    return result;
};

var matrix_vector_product= function(result, a, v) {
    for (var i= 0; i < 3; i++)
	result[i]= a[i][0] * v[0] +
		   a[i][1] * v[1] +
		   a[i][2];

    return result;
};
    
    
exports.Ship= function(initial_state) {
    var self= this;

    self.rotation= initial_state.rotation;
    self.points= initial_state.points;
    self.heading= initial_state.heading;
    self.socket = initial_state.socket;
    self.location= initial_state.location || [0,0];

    self.outline= function(foo) {
    	var translation_out= [[1, 0, -self.location[0]],
    			      [0, 1, -self.location[1]],
    			      [0, 0, 1]];

    	var translation_back= [[1, 0, self.location[0]],
    			       [0, 1, self.location[1]],
    			       [0, 0, 1]];

    	var rotation= [[Math.cos(self.heading), -Math.sin(self.heading), 0],
    		       [Math.sin(self.heading),  Math.cos(self.heading), 0],
    		       [0, 0, 1]];

    	var tmp= [[0, 0, 0],
    		  [0, 0, 0],
    		  [0, 0, 0]];

    	var composite_transform= [[1, 0, 0],
    				  [0, 1, 0],
    				  [0, 0, 1]];
    	matrix_product(tmp, translation_back, rotation);
	matrix_product(composite_transform, tmp, translation_out);

    	var returned_points= underscore.map(self.points,
    					    function(p) {
    						var rv= [0, 0, 0];
    						matrix_vector_product(rv, composite_transform, p);
						return [rv[0]/rv[2], rv[1]/rv[2]];
    					    });

	return returned_points;
    };
};
