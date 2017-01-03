angular.module('YASW').factory('gamepad_service', [
  'game_server',
  function (game_server) {

    var service = {};

    var fire_button_index = 0;
    var thrust_button_index = 1;

    function YaswGamepad(dom_gamepad) {
      var _dom_gamepad_ = dom_gamepad || {buttons: [
          {pressed: false},
          {pressed: false},
        ]};

      this.fire = function (new_value) {

        var fire_button = _dom_gamepad_.buttons[fire_button_index];

        if (new_value!==undefined)
          fire_button.pressed = new_value;

        return fire_button.pressed;
      };

      this.thrust = function (new_value) {
        var thrust_button = _dom_gamepad_.buttons[thrust_button_index];

        if (new_value!==undefined)
          thrust_button.pressed = new_value;

        return thrust_button.pressed;
      };
    }

    service.YaswGamepad=YaswGamepad;


    service.last_gamepad = new YaswGamepad({buttons: [
      {pressed: false},
      {pressed: false},
    ]});

    service.interpret_command = function (gamepad) {

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

