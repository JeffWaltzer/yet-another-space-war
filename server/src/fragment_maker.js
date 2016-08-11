var underscore = require('underscore');
var math_util = require('./math_util');
var Fragment= require('./fragment').Fragment;

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


var fragment_parameters = function (ship,shape_index) {
  return {
    game: ship.game,
    position: ship.position(),
    velocity: [
      ship.velocity.x() + math_util.random_in_range(-50, 50),
      ship.velocity.y() + math_util.random_in_range(-50, 50)
    ],
    angular_velocity: math_util.random_in_range(-10, 10),
    life_left: 3,
    points: fragment_shapes[(shape_index) % fragment_shapes.length]
  };
};

var add_fragment = function (ship, shape_index) {
  return ship.game.game_field.add_screen_object(
      new Fragment(fragment_parameters(ship, shape_index++))
  );
};

exports.add_fragments = function (ship) {
  var number_of_fragments = Math.floor(math_util.random_in_range(2, 12));
  var fragments = [];
  for (var i = 0; i < number_of_fragments; i++) {
    fragments.push(add_fragment(ship, i));
  }
  return fragments;
};



exports.fragment_shapes = fragment_shapes;
