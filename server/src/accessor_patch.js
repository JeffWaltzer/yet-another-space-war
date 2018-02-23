Object.prototype.accessor = function(name, after) {
  var field_name= "_" + name;
  this.prototype[name]= function(new_value) {
    if (new_value !== undefined) {
      this[field_name]= new_value;
      if (after !== undefined) {
	after.call(this);
      }
    }
    return this[field_name];
  };
};
