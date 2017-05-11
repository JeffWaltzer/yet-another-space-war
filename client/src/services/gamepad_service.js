angular.module('YASW').factory('gamepad_service', [
  'game_server',
  'GamepadState',
  function (game_server,GamepadState) {

    var service = {};

    function Gamepad() {
      var new_gamepad = {};

      new_gamepad.last_gamepad_state = new GamepadState();

      function interpret_command(gamepad_state) {
        if (gamepad_state.fire() && !this.last_gamepad_state.fire()) {
          game_server.send('fire');
        }

        if (gamepad_state.thrust() && !this.last_gamepad_state.thrust())
          game_server.send('thrust_on');

        if (!gamepad_state.thrust() && this.last_gamepad_state.thrust())
          game_server.send('thrust_off');

        if (this.last_gamepad_state.both_down()) {
          if (gamepad_state.rotating_left())
            game_server.send('rotate_left');
           else if (gamepad_state.rotating_right())
            game_server.send('rotate_right');
          else if (gamepad_state.both_up())
            game_server.send('rotate_stop');
        }
        else if (this.last_gamepad_state.rotating_right()) {
          if (gamepad_state.both_up() || gamepad_state.both_down())
            game_server.send('rotate_stop');
          else if (gamepad_state.rotating_left())
            game_server.send('rotate_left');
        }
        else if (this.last_gamepad_state.rotating_left()) {
          if (gamepad_state.both_up() || gamepad_state.both_down())
            game_server.send('rotate_stop');
          else if (gamepad_state.rotating_right())
            game_server.send('rotate_right');
        }
        else if (this.last_gamepad_state.both_up()) {
          if (gamepad_state.rotating_right())
            game_server.send('rotate_right');
          else if (gamepad_state.rotating_left())
            game_server.send('rotate_left');
          else if (gamepad_state.both_down())
            game_server.send('rotate_stop');
        }
        this.last_gamepad_state = gamepad_state;
      }

      new_gamepad.interpret_command = interpret_command;

      return new_gamepad;
    }


    service.GamepadState= GamepadState;

    service.interpret_command = Gamepad().interpret_command;

    service.create_gamepad = Gamepad;
    return service;
  }

]);

