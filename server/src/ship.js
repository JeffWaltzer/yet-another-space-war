exports.Ship= function(initial_state) {
    var self= this;

    self.rotation= initial_state.rotation;
    self.points= initial_state.points;
    self.outline= function() {
        return JSON.stringify(self.points);
    };
};
