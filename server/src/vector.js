exports.Vector= function(coordinates) {
  var self= this;
  self.coordinates= [0,0];

  if (coordinates !== undefined) {
    if (typeof coordinates === 'object') {
      if (Array.isArray(coordinates)) {
        if (coordinates.length === 2)
          self.coordinates= coordinates;
        else if (coordinates.length === 3)
          self.coordinates= [
            coordinates[0]/coordinates[2],
            coordinates[1]/coordinates[2]
          ];
        else
          throw("wrong size array while initalizing Vector");
      }
      else if (coordinates instanceof exports.Vector) {
        self.coordinates= [coordinates.x(),
                           coordinates.y()];
      }
      else {
        if (coordinates.magnitude === undefined)
          throw("invalid argument for new Vector: missing magnitude");
        if (coordinates.heading === undefined)
          throw("invalid argument for new Vector: missing heading");

        self.coordinates= [
          coordinates.magnitude * Math.cos(coordinates.heading),
          coordinates.magnitude * Math.sin(coordinates.heading)
        ];
      }
    }
    else {
      throw("invalid argument for new Vector");
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
