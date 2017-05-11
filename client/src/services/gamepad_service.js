angular.module('YASW').factory('gamepad_service', [
  'game_server',
  'gamepad_state',
  function (game_server,gamepad_state) {

    var service = {};

    function create_gamepad() {
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

    var button_bindings= {
      fire: 7,
      thrust: 9,
      left: 1,
      right: 2
    };

    var number_of_buttons= function() {
      return _(_(button_bindings).values()).max() + 1;
    };

    function GamepadState(dom_gamepad) {

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


      this.rotating_left= function() {
        return this.left()  &&  !this.right();
      };
        
      this.rotating_right= function() {
        return !this.left() && this.right();
      };

      this.both_up= function() {
        return !this.left() && !this.right();
      };            

      this.both_down= function() {
        return this.left() && this.right();
      };

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

      this.left = function (new_value) {
        var left_button = buttons[button_bindings.left];

        if (new_value!==undefined)
          left_button.pressed = new_value;

        return left_button.pressed;
      };

      this.right = function (new_value) {
        var right_button = buttons[button_bindings.right];

        if (new_value!==undefined)
          right_button.pressed = new_value;

        return right_button.pressed;
      };
    }

    service.GamepadState= GamepadState;

    service.interpret_command = create_gamepad().interpret_command;

    service.create_gamepad = create_gamepad;
    return service;
  }

]);

