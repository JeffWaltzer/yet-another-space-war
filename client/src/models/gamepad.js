angular.module('YASW').factory('Gamepad', [
  '$location',
  'GamepadState',
  function ($location, GamepadState) {

    var make_socket = function () {
      return eio(
        'ws://' +
        $location.host() +
        ':' + $location.port(),
        {transports: ['websocket']});
    };

    function Gamepad(id, commandSocket) {
      this.id = id;
      this.last_gamepad_state = new GamepadState();
      this._command_socket = commandSocket;
    }

    Gamepad.gamepads= [];

    Gamepad.dom_gamepads = function () {
      return navigator.getGamepads();
    };

    Gamepad.poll_gamepads = function () {
      _(Gamepad.dom_gamepads()).each(
        function (dom_gamepad, index) {
          if (index >= Gamepad.gamepads.length)
            Gamepad.gamepads.push(null);

          if (dom_gamepad === null)
            return;

          var gamepad= Gamepad.gamepads[index];

          if (gamepad === null) {
            gamepad= new Gamepad(dom_gamepad.id, make_socket());
            gamepad.connect();
            Gamepad.gamepads[index]= gamepad;
          }
          gamepad.interpret_command(
            new GamepadState(dom_gamepad)
          );
        });
    };

    Gamepad.timer= setInterval(Gamepad.poll_gamepads, 50);

    Gamepad.prototype.connect= function() {
      this.send_new_player(this.id);
    };

    Gamepad.prototype.command_socket= function() {
      return this._command_socket;
    };

    Gamepad.prototype.send_new_player= function(id) {
      this.command_socket().send(JSON.stringify({command: 'stop-screen-updates'}));
    };

    Gamepad.prototype.send_command= function(command) {
      this.command_socket().send(JSON.stringify({command: command}));
    };

    Gamepad.prototype.interpret_command = function (gamepad_state) {
      if (gamepad_state.fire_down_since(this.last_gamepad_state)) {
        this.send_command('fire');
      }

      if (gamepad_state.thrust_down_since(this.last_gamepad_state)) {
        this.send_command('thrust_on');
      }

      if (gamepad_state.thrust_up_since(this.last_gamepad_state)) {
        this.send_command('thrust_off');
      }

      if (gamepad_state.rotating_left()  && !this.last_gamepad_state.rotating_left())
        this.send_command('rotate_left');

      else if (gamepad_state.rotating_right() && !this.last_gamepad_state.rotating_right())
        this.send_command('rotate_right');

      else if (this.last_gamepad_state.rotating() && !gamepad_state.rotating())
        this.send_command('rotate_stop');

      this.last_gamepad_state = gamepad_state;
    };

    return Gamepad;
  }

]);
