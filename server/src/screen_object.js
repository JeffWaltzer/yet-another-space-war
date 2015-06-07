var underscore= require('underscore');
var transforms= require('./transform');

exports.ScreenObject= function(){
};

exports.ScreenObject.prototype.update= function() {};
exports.ScreenObject.prototype.outline= function() {
  //TODO is there a better way to do 'this'.
  var translation_out=     transforms.make_translation(this.location);
  var rotation=            transforms.make_rotation(this.heading);
  var composite_transform= transforms.identity();

  transforms.concatenate_transforms(composite_transform, translation_out, rotation);

  var returned_points= underscore.map(this.points,
    function(p) {
      var rv= [0, 0, 0];
      transforms.apply_transform(rv, composite_transform, p);
      return [rv[0]/rv[2], rv[1]/rv[2]];
    });
  return returned_points;
};