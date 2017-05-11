angular.module('YASW').factory('Gamepad', [
  'game_server',
  'GamepadState',
  function (game_server,GamepadState) {

  function Gamepad() {
    var self = this;
    this.last_gamepad_state = new GamepadState();

    setInterval(function () {
      self.poll_gamepad();
    }, 50);
  }

  Gamepad.prototype.poll_gamepad = function () {
    var the_dom_gamepads = _(navigator.getGamepads()).compact();
    if (the_dom_gamepads.length > 0) {
      this.interpret_command(
        new GamepadState(the_dom_gamepads[0])
      );
    }
  };


  Gamepad.prototype.interpret_command = function (gamepad_state) {
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
  };

  return Gamepad;
}

]);

