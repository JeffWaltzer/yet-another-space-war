var underscore= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');
var vector=require('./vector');

exports.Game=function(server) {
  var self = this;
  self.add_screen_object= function(new_screen_object) {
    self.screen_objects.push(new_screen_object);
    return new_screen_object;
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

    return self.add_screen_object(new ship.Ship(defaultState));
  };

  self.add_bullet=function(parameters){
    return self.add_screen_object(new bullet.Bullet(parameters));
  };

  function each_screen_object(callback_function) {
    underscore.each(self.screen_objects, callback_function);
  }

  function update_screen_objects() {
    each_screen_object(
      function(screen_object) {
        screen_object.update(
          server.ship_rotation_rate,
          server.tick_rate,
          server.acceleration_rate);
      });
  }

  function game_board() {
    var outlines = {};
    each_screen_object(
      function(screen_object, id) {
        outlines[id] = screen_object.outline();
      });
    return JSON.stringify(outlines);
  }

  function send_game_board(new_board) {
    each_screen_object(
      function(ship) { if (ship.socket) ship.socket.send(new_board); });
  }

  self.tick= function() {
    update_screen_objects();
    send_game_board(game_board());
  };

  if (server.tick_rate!==0)
    setInterval(self.tick, 1000/server.tick_rate);

  self.screen_objects=[];
};
