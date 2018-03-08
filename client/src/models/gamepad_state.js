angular.module('YASW').factory(
  'GamepadState',
  [
    function () {

      var button_bindings= {
        'default' : {
          fire: 7,
          thrust: 9,
          left: 1,
          right: 2
        },
        'DragonRise Inc.   Generic   USB  Joystick   (STANDARD GAMEPAD Vendor: 0079 Product: 0006)' : {
          fire: 6,
          thrust: 11,
          left: 3,
          right: 1,
        },
        'THRUSTMASTER FireStorm Dual Power 2  (Vendor: 044f Product: b304)' : {
          fire: 7,
          thrust: 9,
          left: 1,
          right: 2
        },
        'Saitek PLC Cyborg Force Rumble Pad (Vendor: 06a3 Product: ff0c)' : {
          fire: 6,
          thrust: 2,
          left: 1,
          right: 3
        }
      };


      var number_of_buttons= function() {
        return _(_(button_bindings['default']).values()).max() + 1;
      };

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

      function GamepadState(dom_gamepad) {
        if (dom_gamepad && _(_(button_bindings).keys()).contains(dom_gamepad.id))
          this.id= dom_gamepad.id;
        else
          this.id= 'default';

        this.buttons = dom_gamepad ? real_buttons(dom_gamepad) : fake_buttons();
      }

      GamepadState.set_button_bindings= function(new_value) {
	button_bindings= new_value;
      };
      
      function command_button(name) {
	return function(new_value) {
	  var button= this.buttons[button_bindings[this.id][name]];
	  if (new_value !== undefined)
	    button.pressed= new_value;

	  return button.pressed;
	};
      }
      
      GamepadState.prototype.fire = command_button('fire');
      GamepadState.prototype.thrust = command_button('thrust');
      GamepadState.prototype.left = command_button('left');
      GamepadState.prototype.right = command_button('right');

      GamepadState.prototype.fire_down_since= function(last_gamepad_state) {
        return this.fire() && !last_gamepad_state.fire();
      };

      GamepadState.prototype.thrust_down_since= function(last_gamepad_state) {
        return this.thrust() && !last_gamepad_state.thrust();
      };

      GamepadState.prototype.thrust_up_since= function(last_gamepad_state) {
        return !this.thrust() && last_gamepad_state.thrust();
      };

      GamepadState.prototype.rotating= function() {
        return this.rotating_left() || this.rotating_right();
      };

      GamepadState.prototype.rotating_left= function() {
        return this.left()  &&  !this.right();
      };

      GamepadState.prototype.rotating_right= function() {
        return !this.left() && this.right();
      };

      GamepadState.prototype.both_up= function() {
        return !this.left() && !this.right();
      };

      GamepadState.prototype.both_down= function() {
        return this.left() && this.right();
      };

      return GamepadState;
    }
  ]
);
