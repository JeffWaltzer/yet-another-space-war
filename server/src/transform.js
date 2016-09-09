exports.concatenate_transforms= function(result, a, b) {
  for (var i= 0; i < 3; i++)
    for (var j= 0; j < 3; j++) {
      result[i][j]= 0;
      for (var k= 0; k < 3; k++)
	result[i][j] += a[i][k]*b[k][j];
    }
  return result;
};

exports.apply_transform= function(result, a, v) {
  for (var i= 0; i < 3; i++)
    result[i]= a[i][0] * v[0] +
    a[i][1] * v[1] +
    a[i][2];

  return result;
};

exports.make_translation= function(v) {
  return [[1, 0, v.x()],
    	  [0, 1, v.y()],
    	  [0, 0, 1]];
};

exports.make_rotation= function(angle) {
  return [[Math.cos(angle), -Math.sin(angle), 0],
    	  [Math.sin(angle),  Math.cos(angle), 0],
    	  [0, 0, 1]];
};

exports.identity= function() {
  return [[1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]];
};

