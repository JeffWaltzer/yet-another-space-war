var _= require('underscore');
var transforms= require('./transform');
var vector= require('./vector');
var NullPlayer= require('./null_player').NullPlayer;

function ScreenObject(initial_state) {
  this.game_field= initial_state.game_field;
  this.points= initial_state.points;
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

ScreenObject.prototype.ship_to_game_transform= function() {
    var rotation=            transforms.make_rotation(this.heading);
    var composite_transform= transforms.identity();
    var scale_and_translate_transform= transforms.make_translation(this._position);

    return transforms.concatenate_transforms(composite_transform,
                                             scale_and_translate_transform,
                                             rotation);
};

ScreenObject.prototype.generate_outline = function () {
  this.bounding_box = false;

  var composite_transform = this.ship_to_game_transform();
  var returned_points = _(this.points).map(
      function (p) {
        var rv = [0, 0, 0];
        transforms.apply_transform(rv, composite_transform, p);
        var x = (rv[0] / rv[2]);
        var y = (rv[1] / rv[2]);
        if (this.bounding_box) {
          if (x > this.bounding_box.right)  this.bounding_box.right = x;
          if (x < this.bounding_box.left)  this.bounding_box.left = x;
          if (y > this.bounding_box.top)  this.bounding_box.top = y;
          if (y < this.bounding_box.bottom)  this.bounding_box.bottom = y;
        } else {
          this.bounding_box = {};
          this.bounding_box.left = this.bounding_box.right = x;
          this.bounding_box.top = this.bounding_box.bottom = y;
        }
        return [x, y];
      },
      this);

  return returned_points;
};

ScreenObject.prototype.update_outline = function() {
  this.outline_cache = this.generate_outline();
};

ScreenObject.prototype.outline= function() {
  return this.outline_cache;
};

ScreenObject.prototype.update= function(tick_rate) {
  this._position.add_to(this.velocity.divide(tick_rate));
  if (this.game_field)
      this._position.clip_to(this.game_field.field_size());
  this.heading += this.angular_velocity / tick_rate;
  this.update_outline();
};

ScreenObject.prototype.lines=function () {
  var result = [];
  var transform_points = this.outline();
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
    outline: this.outline(),
    id: this.id,
    score: this.score(),
    position: [
      this.position().x(),
      this.position().y()
    ]
  };
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


exports.ScreenObject = ScreenObject;
