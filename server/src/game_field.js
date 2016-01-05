var vector=require('./vector');

exports.GameField = function(initial_state) {
  this._field_size = initial_state.field_size || new vector.Vector([800,600]);

};

exports.GameField.prototype.field_size = function () {
  return this._field_size;
};