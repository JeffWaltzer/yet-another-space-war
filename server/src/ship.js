var underscore= require('underscore');

exports.Ship= function(initial_state) {
  var self= this;

  self.rotation= initial_state.rotation;
  self.points= initial_state.points;
  self.heading= initial_state.heading;
  self.outline= function() {
    return underscore.map(self.points,
                          function(p) {
                            return [Math.cos(self.heading) * p[0] - Math.sin(self.heading) * p[1],
                                    Math.sin(self.heading) * p[0] + Math.cos(self.heading) * p[1]];
                          });
  };
};
