angular.module('YASW').factory('gamepad_service', [
  'game_server',
  function (game_server) {
  //   var button_in_state = function (button, state) {
  //     return service[button + '_button'] === state;
  //   };

  //   var rotation_buttons_in_state = function (left, right) {
  //     return button_in_state('left', left) && button_in_state('right', right);
  //   };

    var service = {};

    service.buttons = [{pressed: false}];

    service.fire_button = function() { return 0; };

    //service.left_button = "up";
    //service.right_button = "up";
    //service.thrust_button = "up";
    //service.fire_button = "up";

  //   service.on_fire_down = function () {
  //     if (button_in_state('fire', 'up'))
  //       game_server.send('fire');
  //     service.fire_button = 'down';
  //   };


  //   service.on_fire_up= function() {
  //     service.fire_button= 'up';
  //   };

  //   service.on_down_arrow_down = function() {
  //     if (button_in_state('thrust', 'up'))
  //       game_server.send('thrust_on');
  //     service.thrust_button = 'down';
  //   };

  //   service.on_down_arrow_up = function() {
  //     if (button_in_state('thrust', 'down'))
  //       game_server.send('thrust_off');
  //     service.thrust_button = 'up';
  //   };

  //   service.on_clone_down= function() {
  //     game_server.send('clone');
  //   };

  //   service.on_left_arrow_down = function () {
  //     if (rotation_buttons_in_state('up', 'up'))
  //       game_server.send('rotate_left');
  //     else if (rotation_buttons_in_state('up', 'down'))
  //       game_server.send('rotate_stop');
  //     service.left_button = 'down';
  //   };

  //   service.on_left_arrow_up = function () {
  //     if (rotation_buttons_in_state('down', 'down'))
  //       game_server.send('rotate_right');
  //     else if (rotation_buttons_in_state('down', 'up'))
  //       game_server.send('rotate_stop');
  //     service.left_button = 'up';
  //   };


  //   service.on_right_arrow_down = function () {
  //     if (rotation_buttons_in_state('up', 'up'))
  //       game_server.send('rotate_right');
  //     else if (rotation_buttons_in_state('down', 'up'))
  //       game_server.send('rotate_stop');
  //     service.right_button = 'down';
  //   };

  //   service.on_right_arrow_up = function () {
  //     if (rotation_buttons_in_state('down', 'down'))
  //       game_server.send('rotate_left');
  //     else if (rotation_buttons_in_state('up', 'down'))
  //       game_server.send('rotate_stop');
  //     service.right_button = 'up';
  //   };

    return service;
  }
]);
