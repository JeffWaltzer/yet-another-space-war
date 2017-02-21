var _= require('underscore');
var transforms= require('./transform');
var vector= require('./vector');
var NullPlayer= require('./null_player').NullPlayer;

function ScreenObject(initial_state) {
  this.game_field= initial_state.game_field;
  this.shape = initial_state.shape;
  this._color= 'white';
  this._position = new vector.Vector(initial_state.position || [0, 0]);
  this.velocity= new vector.Vector(initial_state.velocity || [0,0]);
  this._player= initial_state.player || new NullPlayer();
  this.heading = initial_state.heading || 0;
  this.angular_velocity = initial_state.angular_velocity || 0;

  this.update_outline();

  this.position = function(new_value) {
    if (typeof new_value !== 'undefined') {
      this._position = new_value;
      this.update_outline();
    }
    return this._position;
  };
}

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
  var transformed_shape = this.shape.transform_polygon(composite_transform);

  this.bounding_box = false;
  this.bounding_box= transformed_shape.find_bounding_box(this.bounding_box);

  return transformed_shape;
};

ScreenObject.prototype.update_outline = function() {
  this.outline_cache = this.generate_outline();
};

ScreenObject.prototype.outline= function() {
  return this.outline_cache;
};

ScreenObject.prototype.update= function(tick_rate) {
  this._position.add_to(this.velocity.divide(tick_rate));
  this._position.clip_to(this.game_field.field_size());
  this.heading += this.angular_velocity / tick_rate;
  this.update_outline();
};

ScreenObject.prototype.lines=function () {
  var result = [];
  var transform_points = this.outline()._points;
  for(var i = 0; i< transform_points.length; i++) {
    result.push([
      transform_points[i],
      transform_points[(i+1) % transform_points.length]
    ]);
  }
  return result;
};

ScreenObject.prototype.player= function(new_value) {
  if (new_value !== undefined)
    this._player= new_value;
  return this._player;
};

ScreenObject.prototype.make_game_piece= function() {
  return {
    wireframe: this.outline(),
    color: this.color(),
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

ScreenObject.prototype.color= function(new_value) {
  if (new_value)
    this._color= new_value;
  return this._color;
};

exports.ScreenObject = ScreenObject;
