var _= require('underscore');
var transforms= require('./transform');
var vector= require('./vector');
var NullPlayer= require('./null_player').NullPlayer;
var physics = require('./physics');


function ScreenObject(initial_state) {

  if (!initial_state.mass) {
    throw 'Mass is required';
  }

  this.game_field= initial_state.game_field;
  this.shape(initial_state.shape);
  this._player= initial_state.player || new NullPlayer();
  this.heading = initial_state.heading || 0;
  this.position(new vector.Vector(initial_state.position || [0, 0]));
  this.velocity(new vector.Vector(initial_state.velocity || [0,0]));
  this.angular_velocity(initial_state.angular_velocity || 0);
  this.mass(initial_state.mass);

  this.update_outline();

}

ScreenObject.accessor('player');
ScreenObject.accessor('angular_velocity');
ScreenObject.accessor('velocity');
ScreenObject.accessor('shape');
ScreenObject.accessor('outline');
ScreenObject.accessor('mass');


ScreenObject.prototype.position = function(new_value) {
  if (typeof new_value !== 'undefined') {
    this._position = new_value;
    this.update_outline();
  }
  return this._position;
};

ScreenObject.prototype.to_game_space= function() {
  var rotation=            transforms.make_rotation(this.heading);
  var composite_transform= transforms.identity();
  var scale_and_translate_transform= transforms.make_translation(this.position());

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
  this.outline(this.generate_outline());
};

ScreenObject.prototype.update = function(tick_rate) {
  var screen_object = this;
  physics.update_screen_object(tick_rate, screen_object, this.game_field.suns());

  screen_object.position().clip_to(screen_object.game_field.field_size());
  screen_object.update_outline();
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
