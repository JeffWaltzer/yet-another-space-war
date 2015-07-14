var underscore= require('underscore');
var transforms= require('./transform');
var vector= require('./vector');

exports.ScreenObject= function(initial_state){
  this.game= initial_state.game;
  this.points= initial_state.points;
  this.position= new vector.Vector(initial_state.position || [0,0]);
  this.debug= initial_state.debug || false;
  this.velocity= new vector.Vector(initial_state.velocity || [0,0]);

  this.update_outline();

};

exports.ScreenObject.prototype.ship_to_game_transform= function() {
  return transforms.make_translation(this.position);
};

exports.ScreenObject.prototype.generate_outline = function() {
//TODO is there a better way to do 'this'.
  var composite_transform = this.ship_to_game_transform();
  var returned_points = underscore.map(this.points,
    function(p) {
      var rv = [0, 0, 0];
      transforms.apply_transform(rv, composite_transform, p);
      return [rv[0] / rv[2], rv[1] / rv[2]];
    });
  return returned_points;
};

exports.ScreenObject.prototype.update_outline = function() {
  this.outline_cache = this.generate_outline();
};

exports.ScreenObject.prototype.outline= function() {
  return this.outline_cache;
};

exports.ScreenObject.prototype.update= function(tick_rate) {
  this.position.add_to(this.velocity.divide(tick_rate));
  this.position.clip_to(this.game.field_size);
  this.update_outline();
};

exports.ScreenObject.prototype.dead = function() {
  return false;
};

exports.ScreenObject.prototype.lines=function () {
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

