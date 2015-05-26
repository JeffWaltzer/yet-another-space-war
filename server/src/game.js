var underscore= require('underscore');

exports.Game=function(server) {
   var self = this;
   self.add_ship= function(new_ship) {
      self.ships.push(new_ship);
   };


   self.tick= function() {
      underscore.each(self.ships,
        function(ship) {
           ship.update(
             server.ship_rotation_rate,
             server.tick_rate,
             server.acceleration_rate);
        });

      var ship_outlines = {};
      underscore.each(self.ships,
        function(ship,ship_id) {
           ship_outlines[ship_id] = ship.outline();
        });

      var game_board = JSON.stringify(ship_outlines);

      underscore.each(self.ships,
        function(ship) {
           if (ship.socket) {
              ship.socket.send(game_board);
           }
        });
   };

   setInterval(self.tick, 1000/server.tick_rate);


   self.ships=[];
};
