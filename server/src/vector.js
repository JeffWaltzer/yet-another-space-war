exports.Vector= function(coordinates) {
  var self= this;
  self.coordinates= [0,0];

  if (typeof coordinates === 'object') {
    if (Array.isArray(coordinates)) {
      self.coordinates= coordinates;
    }
    else {
      self.coordinates= [coordinates.magnitude * Math.cos(coordinates.heading),
                         coordinates.magnitude * Math.sin(coordinates.heading)];
    }
  }

  var make_coordinate_accessor= function(i) {
    return function(new_value) {
      if (typeof new_value !== 'undefined')
        self.coordinates[i]= new_value;
      return self.coordinates[i];
    };
  };

  self.x= make_coordinate_accessor(0);
  self.y= make_coordinate_accessor(1);

  self.add_to= function(v) {
    self.x(self.x() + v.x());
    self.y(self.y() + v.y());
    return self;
  };

  self.clip_to= function(v) {
    self.x(self.x() % v.x());
    if (self.x() < 0) self.x(self.x() + v.x());

    self.y(self.y() % v.y());
    if (self.y() < 0) self.y(self.y() + v.y());
  };

  self.divide= function(s) {
    return new exports.Vector([self.x() / s,
                               self.y() / s]);
  };
};
