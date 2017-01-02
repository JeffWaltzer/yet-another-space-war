angular.module('YASW').factory('gamepad_service', [
  'game_server',
  function (game_server) {

    var service = {};

    service.buttons = [
      //TODO FIXME PLEASE!
      {pressed: false},
      {pressed: false},
    ];

    service.fire_button_index = function() { return 0; };
    service.thrust_button_index = function() { return 1; };

    return service;
  }
]);
