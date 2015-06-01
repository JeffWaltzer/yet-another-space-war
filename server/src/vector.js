exports.Vector= function(coordinates) {
  var self= this;

  self.x= function(new_value) {
    if (typeof new_value !== 'undefined')
      coordinates[0]= new_value;
    return coordinates[0];
  };
  self.y= function(new_value) {
    if (typeof new_value !== 'undefined')
      coordinates[1]= new_value;
    return coordinates[1];
  };

  self.add_to= function(v) {
    self.x(self.x() + v.x());
    self.y(self.y() + v.y());
    return self;
  };

  self.divide= function(s) {
    return new exports.Vector([self.x() / s,
                               self.y() / s]);
  };
};
