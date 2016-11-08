angular.module('YASW').factory('keyboard', [
  'game_server',
  function (game_server) {
    var key_in_state = function (key, state) {
      return service[key + '_key'] === state;
    };

    var service = {};

    service.KEY_LEFT_ARROW = 37;
    service.KEY_RIGHT_ARROW = 39;
    service.KEY_DOWN_ARROW = 40;
    service.KEY_SPACE = 32;
    service.KEY_R = 82;

    service.left_key = "up";
    service.right_key = "up";
    service.thrust_key = "up";
    service.fire_key = "up";

    service.on_fire_down = function () {
      if (key_in_state('fire', 'up'))
        game_server.send('fire');
      service.fire_key = 'down';
    };


    service.on_fire_up= function() {
      service.fire_key= 'up';
    };

    service.on_down_arrow_down = function() {
      if (key_in_state('thrust', 'up'))
        game_server.send('thrust_on');
      service.thrust_key = 'down';
    };

    service.on_down_arrow_up = function() {
      if (key_in_state('thrust', 'down'))
        game_server.send('thrust_off');
      service.thrust_key = 'up';
    };

    service.on_clone_down= function() {
      game_server.send('clone');
    };




    return service;
  }]);
