var underscore= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');
var vector=require('./vector');

exports.Game=function(server) {
   var self = this;
   self.add_screen_object= function(new_ship) {
      self.screen_objects.push(new_ship);
   };


  self.field_size = new vector.Vector([800,600]);

  self.add_ship = function(parameters) {

    var defaultState = {
      game: self,
      rotation: 0,
      points: [[-10, 10], [20, 0], [-10, -10], [0, 0]],
      heading: 0,
      location: [0, 0]
    };

    if (parameters !== undefined)
      underscore.extend(defaultState ,parameters);

    var new_ship = new ship.Ship(defaultState);

    self.add_screen_object(new_ship);
    return new_ship;
  };

  self.add_bullet=function(parameters){
    var new_bullet = new bullet.Bullet(parameters);
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
