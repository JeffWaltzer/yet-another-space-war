var underscore= require('underscore');

var MathUtil= require('./math_util');
var vector=require('./vector');


exports.GameField = function(initial_state) {
  this._field_size = initial_state.field_size || new vector.Vector([800,600]);
  this._screen_objects=[];
};

exports.GameField.prototype.field_size = function () {
  return this._field_size;
};

exports.GameField.prototype.screen_objects= function(new_value) {
  if (new_value)
    this._screen_objects= new_value;
  return this._screen_objects;
};

exports.GameField.prototype.each_screen_object= function(callback_function) {
  return underscore.map(this.screen_objects(), callback_function);
};

exports.GameField.prototype.collisions_with= function(screenObject,start_index) {
  var to_remove = [];

  for(var j = start_index; j< this.screen_objects().length; j++) {
    var screenObject2 = this.screen_objects()[j];

    if (screenObject2 === screenObject)
      continue;

    var collided = MathUtil.collided(screenObject, screenObject2);
    if(collided) {
      to_remove.push(screenObject2);
    }
  }
  return to_remove;
};
