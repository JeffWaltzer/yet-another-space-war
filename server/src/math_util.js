var _= require('underscore');

exports.collided =  function(object1, object2) {
  if (!exports.bounding_boxes_intersect(object1.bounding_box,
                                        object2.bounding_box)) {
    return false;
  }

  var result= false;
  _(object1.lines()).each(function(line1){
    _(object2.lines()).each(function(line2){
      if (exports.intersect(line1,line2))
	result= true;
    });
    result = result ||
      point_inside(object1,object2) ||
      point_inside(object2,object1);
  });
  return result;
};

exports.bounding_boxes_intersect = function(box1, box2) {
  function check_one_way(box1, box2) {
    var top_edge_in = (box1.top <= box2.top && box1.top >= box2.bottom);
    var bottom_edge_in = (box1.bottom <= box2.top && box1.bottom >= box2.bottom);
    var left_edge_in = (box1.left >= box2.left && box1.left <= box2.right);
    var right_edge_in = (box1.right >= box2.left && box1.right <= box2.right);

    if (top_edge_in && left_edge_in)
      return true;

    if (top_edge_in && right_edge_in)
      return true;

    if (bottom_edge_in && left_edge_in)
      return true;

    if (bottom_edge_in && right_edge_in)
      return true;

    return false;
  }

  return check_one_way(box1, box2) || check_one_way(box2, box1);
};

function vector_subtract(a, b) {
  return [a[0]-b[0], a[1]-b[1]];
}

function vector_cross(a, b) {
  return a[0]*b[1] - a[1]*b[0];
}

exports.intersect= function(line1, line2) {
  var p= line1[0];
  var q= line2[0];
  var r= vector_subtract(line1[1], line1[0]);
  var s= vector_subtract(line2[1], line2[0]);

  var line1_t= vector_cross(vector_subtract(q,p), s) /
        vector_cross(r, s);
  var line2_t= vector_cross(vector_subtract(p,q), r) /
        vector_cross(s, r);

  return line1_t >= 0 && line1_t <= 1 &&
    line2_t >= 0 && line2_t <= 1;
};

function point_inside(object1,object2) {
  var big_line= [object1.lines()[0][0], [-10000, -10000]];
  var intersection_count= 0;

  _(object2.lines()).each(function(object_line) {
    if (exports.intersect(big_line, object_line))
      intersection_count++;
  });

  return (intersection_count % 2) == 1;
}

exports.random_in_range = function (lower, upper) {
  return (upper-lower) * Math.random() + lower;
};
