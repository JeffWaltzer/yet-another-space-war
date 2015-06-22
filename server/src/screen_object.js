var underscore= require('underscore');
var transforms= require('./transform');
var vector= require('./vector');

exports.ScreenObject= function(parameters){
  this.game= parameters.game;
  this.position= new vector.Vector(parameters.position || [0,0]);
};

exports.ScreenObject.prototype.update= function() {};

exports.ScreenObject.prototype.ship_to_game_transform= function() {
  return transforms.make_translation(this.position);
};

exports.ScreenObject.prototype.outline= function() {
  //TODO is there a better way to do 'this'.
  var composite_transform= this.ship_to_game_transform();

  var returned_points= underscore.map(this.points,
    function(p) {
      var rv= [0, 0, 0];
      transforms.apply_transform(rv, composite_transform, p);
      return [rv[0]/rv[2], rv[1]/rv[2]];
    });
  return returned_points;
};

exports.ScreenObject.prototype.update= function(tick_rate) {
  this.position.add_to(this.velocity.divide(tick_rate));
  this.position.clip_to(this.game.field_size);
};
