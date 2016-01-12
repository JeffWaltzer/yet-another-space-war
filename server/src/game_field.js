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

