angular.module('YASW').factory('Gamepad', [
  '$location',
  'game_server',
  'GamepadState',
  function ($location, game_server,GamepadState) {

    function Gamepad(id) {
      var self = this;
      this.id = id;

      this.last_gamepad_state = new GamepadState();

      this._command_socket =
        eio(
          'ws://'+
            $location.host() +
            ':' + $location.port(),
          {transports: ['websocket']});
    }

    Gamepad.gamepads= [];

    Gamepad.dom_gamepads = function () {
      return navigator.getGamepads();
    };

    Gamepad.poll_gamepads = function () {
      _(_(Gamepad.dom_gamepads()).compact()).each(
        function (dom_gamepad) {
          var gamepad= _(Gamepad.gamepads).find(function(gamepad) {
            return dom_gamepad.id === gamepad.id;
          });
          if (!gamepad) {
            gamepad= new Gamepad(dom_gamepad.id);
            Gamepad.gamepads.push(gamepad);
          }
          gamepad.interpret_command(
            new GamepadState(dom_gamepad)
          );
        });
    };

    Gamepad.timer= setInterval(Gamepad.poll_gamepads, 50);

    Gamepad.prototype.connect= function() {
      this.command_socket().send(JSON.stringify({new_player: this.id}));
    };

    Gamepad.prototype.command_socket= function() {
      return this._command_socket;
    };

    Gamepad.prototype.interpret_command = function (gamepad_state) {
      if (gamepad_state.fire_down_since(this.last_gamepad_state)) {
        this.command_socket().send('fire');
      }

      if (gamepad_state.thrust_down_since(this.last_gamepad_state)) {
        this.command_socket().send('thrust_on');
      }

      if (gamepad_state.thrust_up_since(this.last_gamepad_state)) {
        this.command_socket().send('thrust_off');
      }

      if (gamepad_state.rotating_left()  && !this.last_gamepad_state.rotating_left())
        this.command_socket().send('rotate_left');

      else if (gamepad_state.rotating_right() && !this.last_gamepad_state.rotating_right())
        this.command_socket().send('rotate_right');

      else if (this.last_gamepad_state.rotating() && !gamepad_state.rotating())
        this.command_socket().send('rotate_stop');

      this.last_gamepad_state = gamepad_state;
    };

    return Gamepad;
  }

]);
