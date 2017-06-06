
angular.module('YASW').factory('Gamepad', [
  '$location',
  'game_server',
  'GamepadState',
  function ($location,game_server,GamepadState) {

    function Gamepad(id) {
      var self = this;
      this.id = id;

      this.last_gamepad_state = new GamepadState();
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

            gamepad.web_socket =
              eio(
                'ws://' +
                $location.host() +
                ':' + $location.port(),
                {transports: ['websocket']});
            var message = {new_player: gamepad.id};
            //DEBUG
            console.log('poll_gamepasd:',JSON.stringify(message), message );
            gamepad.web_socket.send(JSON.stringify(message));
          }


          gamepad.interpret_command(
            new GamepadState(dom_gamepad)
          );
        });
    };

    Gamepad.timer= setInterval(Gamepad.poll_gamepads, 50);


    Gamepad.prototype.send = function (e) {
      var message = {command: e};
      this.web_socket.send(JSON.stringify(message));
    };


    Gamepad.prototype.interpret_command = function (gamepad_state) {
      if (gamepad_state.fire_down_since(this.last_gamepad_state)) {
        this.send('fire');
      }

      if (gamepad_state.thrust_down_since(this.last_gamepad_state)) {
        this.send('thrust_on');
      }

      if (gamepad_state.thrust_up_since(this.last_gamepad_state)) {
        this.send('thrust_off');
      }

      if (gamepad_state.rotating_left()  && !this.last_gamepad_state.rotating_left())
        this.send('rotate_left');

      else if (gamepad_state.rotating_right() && !this.last_gamepad_state.rotating_right())
        this.send('rotate_right');

      else if (this.last_gamepad_state.rotating() && !gamepad_state.rotating())
        this.send('rotate_stop');

      this.last_gamepad_state = gamepad_state;
    };

    return Gamepad;
  }

]);
