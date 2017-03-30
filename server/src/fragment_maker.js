var math_util = require('./math_util');
var Fragment= require('./fragment').Fragment;
var Polygon= require('./polygon').Polygon;

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

var fragment_shapes = [
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


function fragment_parameters(game_field, median_position, median_velocity, shape_index) {
  return {
    game_field: game_field,
    position: median_position,
    velocity: [
      median_velocity.x() + math_util.random_in_range(-50, 50),
      median_velocity.y() + math_util.random_in_range(-50, 50)
    ],
    angular_velocity: math_util.random_in_range(-10, 10),
    life_left: math_util.random_in_range(2, 3),
    shape: [new Polygon(fragment_shapes[(shape_index) % fragment_shapes.length])]
  };
}

function add_fragment(game_field, median_position, median_velocity, shape_index) {
  return game_field.add_screen_object(
    new Fragment(fragment_parameters(game_field, median_position, median_velocity, shape_index))
  );
}

function add_fragments(game_field, median_position, median_velocity) {
  var number_of_fragments = Math.floor(math_util.random_in_range(2, 12));
  var fragments = [];
  for (var i = 0; i < number_of_fragments; i++) {
    fragments.push(add_fragment(game_field, median_position, median_velocity, i));
  }
  return fragments;
}

exports.add_fragment= add_fragment;
exports.add_fragments= add_fragments;
exports.fragment_shapes = fragment_shapes;
