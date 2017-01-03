angular.module('YASW').factory('gamepad_service', [
  'game_server',
  function (game_server) {

    var service = {};

    service.buttons = [
      {pressed: false},
      {pressed: false},
    ];


    function YaswGamepad(dom_gamepad) {
      var _dom_gamepad_ = dom_gamepad;

      this.fire = function (new_value) {

        var fire_button = _dom_gamepad_.buttons[service.fire_button_index()];

        if (new_value!==undefined)
          fire_button.pressed = new_value;

        return fire_button.pressed;
      };

      this.thrust = function (new_value) {
        var thrust_button = _dom_gamepad_.buttons[service.thrust_button_index()];

        if (new_value!==undefined)
          thrust_button.pressed = new_value;

        return thrust_button.pressed;
      };
    }

    service.YaswGamepad=YaswGamepad;

    service.fire_button_index = function() { return 0; };
    service.thrust_button_index = function() { return 1; };

    service.last_gamepad = new YaswGamepad({buttons: [
      {pressed: false},
      {pressed: false},
    ]});

    service.interpret_command = function (dom_gamepad) {

      var gamepad = new YaswGamepad(dom_gamepad);

      if (gamepad.fire() && !service.last_gamepad.fire())
        game_server.send('fire');

      if (gamepad.thrust() && !service.last_gamepad.thrust())
        game_server.send('thrust_on');

      if (!gamepad.thrust() && service.last_gamepad.thrust())
        game_server.send('thrust_off');
      service.last_gamepad = gamepad;

    };

    return service;
  }


]);

