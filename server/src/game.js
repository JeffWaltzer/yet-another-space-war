var underscore= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');

exports.Game=function(server) {
   var self = this;
   self.add_screen_object= function(new_ship) {
      self.screen_objects.push(new_ship);
   };

  self.add_player = function(socket) {
    console.log("websocket connect from " + socket.remoteAddress);

    var new_ship = new ship.Ship({
      rotation: 0,
      points: [[-10,10],[20, 0],[-10,-10],[0,0]],
      heading: 0,
      socket: socket,
      location: [100,100]
    });

    self.add_screen_object(new_ship);

  };

  self.add_bullet=function(){
    var new_bullet = new bullet.Bullet({});
    self.add_screen_object( new_bullet);
    return new_bullet;
  };

   self.tick= function() {
      underscore.each(self.screen_objects,
        function(ship) {
           ship.update(
             server.ship_rotation_rate,
             server.tick_rate,
             server.acceleration_rate);
        });

      var ship_outlines = {};
      underscore.each(self.screen_objects,
        function(ship,ship_id) {
           ship_outlines[ship_id] = ship.outline();
        });

      var game_board = JSON.stringify(ship_outlines);

      underscore.each(self.screen_objects,
        function(ship) {
           if (ship.socket) {
              ship.socket.send(game_board);
           }
        });
   };

   if (server.tick_rate!==0)
     setInterval(self.tick, 1000/server.tick_rate);

   self.screen_objects=[];
};
