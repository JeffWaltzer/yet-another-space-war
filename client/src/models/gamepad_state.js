angular.module('YASW').factory(
  'GamepadState',
  [
    function () {

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

        this.fire_down_since= function(last_gamepad_state) {
          return this.fire() && !last_gamepad_state.fire();
        };

        this.thrust_down_since = function(last_gamepad_state) {
          return this.thrust() && !last_gamepad_state.thrust();
        };

        this.thrust_up_since= function(last_gamepad_state) {
          return !this.thrust() && last_gamepad_state.thrust();
        };

        this.rotating= function() {
          return this.rotating_left() || this.rotating_right();
        };

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



      return GamepadState;
    }
  ]
);
