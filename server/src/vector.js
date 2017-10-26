function Vector(coordinates) {
  this.coordinates= [0,0];

  if (coordinates !== undefined) {
    if (typeof coordinates !== 'object') {
      throw("invalid argument for new Vector");
    }

    if (Array.isArray(coordinates)) {
      if (coordinates.length === 2)
	this.coordinates= coordinates;
      else if (coordinates.length === 3)
	this.coordinates= [
	  coordinates[0]/coordinates[2],
	  coordinates[1]/coordinates[2]
	];
      else
	throw("wrong size array while initalizing Vector");
    }
    else if (coordinates instanceof Vector) {
      this.coordinates= [coordinates.x(),
			 coordinates.y()];
    }
    else if (coordinates.magnitude !== undefined  &&  coordinates.heading !== undefined) {
      this.coordinates= [
        coordinates.magnitude * Math.cos(coordinates.heading),
        coordinates.magnitude * Math.sin(coordinates.heading)
      ];
    }
    else {
      throw("invalid Object for new Vector");
    }
  }
}

Vector.prototype.make_coordinate_accessor= function(i) {
  return function(new_value) {
    if (typeof new_value !== 'undefined')
      this.coordinates[i]= new_value;
    return this.coordinates[i];
  };
};

Vector.prototype.x= Vector.prototype.make_coordinate_accessor(0);
Vector.prototype.y= Vector.prototype.make_coordinate_accessor(1);

Vector.prototype.add_to= function(v) {
  this.x(this.x() + v.x());
  this.y(this.y() + v.y());
  return this;
};

Vector.prototype.clip_to= function(v) {
  this.x(this.x() % v.x());
  if (this.x() < 0)
    this.x(this.x() + v.x());

  this.y(this.y() % v.y());
  if (this.y() < 0)
    this.y(this.y() + v.y());
};

Vector.prototype.divide= function(s) {
  return new Vector([this.x() / s,
		     this.y() / s]);
};

Vector.prototype.equal= function(v) {
  return this.constructor == Vector &&
    v.constructor == Vector &&
    this.x() == v.x() &&
    this.y() == v.y();
};

exports.Vector= Vector;

