exports.Game=function() {
   var self = this;
   self.add_ship= function(new_ship) {
      self.ships.push(new_ship);
   };

   self.ships=[];
};
