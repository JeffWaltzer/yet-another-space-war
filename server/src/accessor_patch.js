Object.prototype.accessor = function(name) {
  var field_name= "_" + name;
  this.prototype[name]= function(new_value) {
    if (new_value !== undefined) {
      this[field_name]= new_value;
    }
    return this[field_name];
  };
};
