var underscore = require('underscore');

function make_fragment(n_sides, base_size) {
    var fragment= [];
    for (var i= 0; i < n_sides; i++) {
	var twiddle= 1 + 0.8 * Math.random() - 0.4;
	var angle= (2*Math.PI/n_sides) * i;
	var size= base_size*twiddle;
	fragment.push([size*Math.cos(angle),
		       size*Math.sin(angle)]);
    }
    return fragment;
}

var fragmentShapes = [
  make_fragment(Math.floor(10.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(11.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(12.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(13.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(14.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(15.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(16.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(17.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(18.5 + Math.random()),
		5*Math.random() + 5),
  make_fragment(Math.floor(19.5 + Math.random()),
		5*Math.random() + 5),
];

exports.fragment_shapes = fragmentShapes;
