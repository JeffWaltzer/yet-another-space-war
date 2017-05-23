
angular.module('YASW').factory('Gamepad', [
  'game_server',
  'GamepadState',
  function (game_server,GamepadState) {

    function Gamepad(id) {
      var self = this;
      this.id = id;

      this.last_gamepad_state = new GamepadState();

      setInterval(function () {
        self.poll_gamepad();
      }, 50);
    }

    Gamepad.dom_gamepads = function () {
      return navigator.getGamepads();
    };

    Gamepad.prototype.poll_gamepad = function () {
      var self = this;
      var the_dom_gamepad = _(Gamepad.dom_gamepads()).find(
        function (a_dom_gamepad) {
          return a_dom_gamepad && a_dom_gamepad.id === self.id;
        });

      if (the_dom_gamepad) {
        this.interpret_command(
          new GamepadState(the_dom_gamepad)
        );
      }
    };

    Gamepad.prototype.interpret_command = function (gamepad_state) {
      if (gamepad_state.fire_down_since(this.last_gamepad_state)) {
        game_server.send('fire');
      }

      if (gamepad_state.thrust_down_since(this.last_gamepad_state)) {
        game_server.send('thrust_on');
      }

      if (gamepad_state.thrust_up_since(this.last_gamepad_state)) {
        game_server.send('thrust_off');
      }

      if (gamepad_state.rotating_left()  && !this.last_gamepad_state.rotating_left())
        game_server.send('rotate_left');

      else if (gamepad_state.rotating_right() && !this.last_gamepad_state.rotating_right())
        game_server.send('rotate_right');

      else if (this.last_gamepad_state.rotating() && !gamepad_state.rotating())
        game_server.send('rotate_stop');

      this.last_gamepad_state = gamepad_state;
    };

    return Gamepad;
  }

]);
