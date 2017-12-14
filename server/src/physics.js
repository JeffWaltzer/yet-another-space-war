var _= require('underscore');
var Vector = require('./vector').Vector;

var square = function (x) {
  return x * x;
};

var update_screen_object = function (tick_rate, screen_object, suns) {
  var the_sun = suns[0];

  if (the_sun && screen_object !== the_sun) {
    apply_gravity(the_sun, screen_object);
  }
  update_state(screen_object, tick_rate);
};


var apply_gravity = function (sun, screen_object) {
  var delta_x = sun.position().x() - screen_object.position().x();
  var delta_y = sun.position().y() - screen_object.position().y();

  var distance = Math.sqrt(square(delta_x) + square(delta_y));
  var force_magnitude = screen_object.game_field.G() * sun.mass() * screen_object.mass() / square(distance);

  var force = new Vector([force_magnitude * delta_x / distance, force_magnitude * delta_y / distance]);

  screen_object.velocity().add_to(force.divide(screen_object.mass()));
};

var update_screen_objects = function (screen_objects, tick_rate) {
  _(screen_objects).map(function (screen_object) {
    screen_object.update(tick_rate);
  });

};

var update_state = function (screen_object, tick_rate) {
  screen_object.position().add_to(screen_object.velocity().divide(tick_rate));
  screen_object.heading += screen_object.angular_velocity() / tick_rate;
};


exports.update_screen_objects = update_screen_objects;
exports.apply_gravity = apply_gravity;
exports.update_state = update_state;
exports.update_screen_object = update_screen_object;
