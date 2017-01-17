angular.module('YASW').factory('gamepad_service', [
  'game_server',
  function (game_server) {

    var service = {};

    var button_bindings= {
      fire: 2,
      thrust: 0,
    };

    var number_of_buttons= function() {
      return _(_(button_bindings).values()).max() + 1;
    };

    function YaswGamepad(dom_gamepad) {

      function fake_buttons() {
        var buttons = _(Array(number_of_buttons())).map(function () {
          return {pressed: false};
        });
        return buttons;
      }

      function real_buttons(dom_gamepad) {
        var buttons = _.map(dom_gamepad.buttons, function(a_button){
          return {pressed: a_button.pressed};
        });
        return buttons;
      }

      var buttons = dom_gamepad ? real_buttons(dom_gamepad) : fake_buttons();


      this.fire = function (new_value) {

        var fire_button = buttons[button_bindings.fire];

        if (new_value!==undefined)
          fire_button.pressed = new_value;

        return fire_button.pressed;
      };

      this.thrust = function (new_value) {
        var thrust_button = buttons[button_bindings.thrust];

        if (new_value!==undefined)
          thrust_button.pressed = new_value;

        return thrust_button.pressed;
      };
    }

    service.YaswGamepad=YaswGamepad;

    service.last_gamepad = new YaswGamepad();

    service.interpret_command = function (gamepad) {
      if (gamepad.fire() && !service.last_gamepad.fire()) {
        game_server.send('fire');
      }

      if (gamepad.thrust() && !service.last_gamepad.thrust())
        game_server.send('thrust_on');

      if (!gamepad.thrust() && service.last_gamepad.thrust())
        game_server.send('thrust_off');

      service.last_gamepad = gamepad;
    };

    return service;
  }


]);

