var _= require('underscore');
var transforms= require('./transform');
var vector= require('./vector');
var NullPlayer= require('./null_player').NullPlayer;
var Vector = require('./vector').Vector;

function ScreenObject(initial_state) {

  if (!initial_state.mass) {
    throw 'Mass is required';
  }

  this.game_field= initial_state.game_field;
  this.shape(initial_state.shape);
  this._position = new vector.Vector(initial_state.position || [0, 0]);
  this.velocity= new vector.Vector(initial_state.velocity || [0,0]);
  this._player= initial_state.player || new NullPlayer();
  this.heading = initial_state.heading || 0;
  this.angular_velocity = initial_state.angular_velocity || 0;
  this.mass(initial_state.mass);

  this.update_outline();

  this.position = function(new_value) {
    if (typeof new_value !== 'undefined') {
      this._position = new_value;
      this.update_outline();
    }
    return this._position;
  };
}

ScreenObject.prototype.shape = function (new_shape) {
  if (new_shape)
    this._shape = new_shape;
  return this._shape;
};

ScreenObject.prototype.to_game_space= function() {
  var rotation=            transforms.make_rotation(this.heading);
  var composite_transform= transforms.identity();
  var scale_and_translate_transform= transforms.make_translation(this._position);

  return transforms.concatenate_transforms(composite_transform,
                                           scale_and_translate_transform,
                                           rotation);
};

ScreenObject.prototype.generate_outline = function () {
  var composite_transform = this.to_game_space();

  var transformed_shape = _(this.shape()).map(function (polygon) {
    return polygon.transform_polygon(composite_transform);
  });

  this.bounding_box= false;
  var self= this;
  _(transformed_shape).each(
     function(polygon) {
       self.bounding_box= polygon.find_bounding_box(self.bounding_box);
  });

    return transformed_shape;
};

ScreenObject.prototype.update_outline = function() {
  this.outline_cache = this.generate_outline();
};

ScreenObject.prototype.outline= function() {
  return this.outline_cache;
};

var square = function (x) {
  return x * x;
};

ScreenObject.prototype.update= function(tick_rate) {
  var the_sun = this.game_field.suns()[0];

  if (the_sun && this !== the_sun) {
    var delta_x = the_sun.position().x() - this.position().x();
    var delta_y = the_sun.position().y() - this.position().y();

    var distance = Math.sqrt(square(delta_x) + square(delta_y));
    var force_magnitude = this.game_field.G() * the_sun.mass() * this.mass() / square(distance);

    var force = new Vector([force_magnitude * delta_x / distance, force_magnitude * delta_y / distance]);

    this.velocity.add_to(force.divide(this.mass()));
  }
  this._position.add_to(this.velocity.divide(tick_rate));
  this._position.clip_to(this.game_field.field_size());
  this.heading += this.angular_velocity / tick_rate;
  this.update_outline();
};

ScreenObject.prototype.lines=function () {
    var result = [];
    _(this.outline()).each(function(polygon) {
        var transform_points = polygon._points;
        for(var i = 0; i< transform_points.length; i++) {
            result.push([
                transform_points[i],
                transform_points[(i+1) % transform_points.length]
            ]);
        }
    });
    return result;
};

ScreenObject.prototype.player= function(new_value) {
  if (new_value !== undefined)
    this._player= new_value;
  return this._player;
};

ScreenObject.prototype.make_game_piece= function() {
  return {
      wireframe: _(this.outline()).map(
          function(polygon) {
              return {
                  points: polygon.points(), 
                  color: polygon.color(),
              };
          }),
      score: this.score(),
      position: [
          this.position().x(),
          this.position().y()
      ]
  };
};

ScreenObject.prototype.point_value= function() {
  return 0;
};

ScreenObject.prototype.mass = function (new_value) {
  if (new_value)
    this._mass= new_value;
  return this._mass;
};

ScreenObject.prototype.bump_player_score = function (other_object) {
};

ScreenObject.prototype.explode = function() {
  this.game_field.remove_screen_object(this);
};

ScreenObject.prototype.is_bullet = function () {
  return false;
};

ScreenObject.prototype.is_fragment = function () {
  return false;
};

ScreenObject.prototype.is_ship = function () {
  return false;
};

ScreenObject.prototype.ignores_collisions= function() {
  return false;
};

ScreenObject.prototype.live = function() {
  return true;
};

ScreenObject.prototype.score = function() {
  return 0;
};

ScreenObject.prototype.fire = function() {
};

ScreenObject.prototype.stop_screen_updates = function (){
};

ScreenObject.prototype.color = function (new_value) {
  if (new_value) {
    this.shape()[0]._color = new_value;
    this.update_outline();
  }
  return this.shape()[0]._color;
};

exports.ScreenObject = ScreenObject;
