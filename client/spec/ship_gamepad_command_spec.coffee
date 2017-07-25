describe "ShipCommandController", ->
  beforeEach module("YASW")

  scope = undefined
  $location = undefined
  createController = undefined
  game_server = undefined
  Gamepad =undefined
  GamepadState = undefined
  the_gamepad =undefined

  make_fake_gamepad = (button_values) ->
    return_value = new GamepadState()
    _(button_values).each (value, key) ->
      return_value[key](value)
    return_value

  beforeEach inject(($rootScope, $controller, _$location_, _game_server_, _Gamepad_, _GamepadState_) ->
    $location = _$location_
    scope = $rootScope.$new()
    createController = ->
      $controller "ShipCommandController",
        $scope: scope
    game_server = _game_server_
    Gamepad = _Gamepad_
    GamepadState=_GamepadState_

    the_gamepad = new Gamepad('id', {send:->});

  )

  describe "Initial button states", ->
    it "start fire up", ->
      expect(the_gamepad.last_gamepad_state.fire()).toBeFalsy()

    it "start thrust up", ->
      expect(the_gamepad.last_gamepad_state.thrust()).toBeFalsy()


  fire_up_sent_tests = [
    {buttons: {fire: 'up'}, expected_sent: null},
    {buttons: {fire: 'down'}, expected_sent: null},
  ]

  _.each fire_up_sent_tests, (test_conditions) ->
    describe "When the fire button is #{test_conditions.buttons.fire}", ->
      beforeEach ->
        createController()
        the_gamepad.last_gamepad_state.fire(test_conditions.buttons.fire == 'down');

        spyOn the_gamepad.command_socket(), "send"

      describe " and we receive up", ->
        beforeEach ->
          the_gamepad.interpret_command(make_fake_gamepad(fire: false));

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(the_gamepad.command_socket().send).toHaveBeenCalledWith test_conditions.expected_sent
        else
          it "does not send", ->
            expect(the_gamepad.command_socket().send).not.toHaveBeenCalled()

  fire_down_sent_tests = [
    {fire_button: "up", expected_sent: "fire"},
    {fire_button: "down", expected_sent: null}
  ]

  _.each fire_down_sent_tests, (test_conditions) ->
    describe "When fire button is #{test_conditions.fire_button}", ->
      beforeEach ->
        createController()
        the_gamepad.last_gamepad_state.fire(test_conditions.fire_button == 'down')
        spyOn the_gamepad.command_socket(), "send"

      describe " and we receive down", ->
        beforeEach ->
          the_gamepad.interpret_command(make_fake_gamepad(fire: true));

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(the_gamepad.command_socket().send).toHaveBeenCalledWith JSON.stringify({command: test_conditions.expected_sent})
        else
          it "does not send", ->
            expect(the_gamepad.command_socket().send).not.toHaveBeenCalled()

  fire_up_state_tests = [
    {fire_button: "up",   expected_state: "up"},
    {fire_button: "down", expected_state: "up"}
  ]

  _.each fire_up_state_tests, (test_conditions) ->
    describe "When fire button is #{test_conditions.fire_button}", ->
      beforeEach ->
        createController()
        the_gamepad.last_gamepad_state.fire(test_conditions.fire_button == 'down');


      describe " and we receive up", ->
        beforeEach ->
          the_gamepad.interpret_command(make_fake_gamepad(fire: false));

        it "fire button is #{test_conditions.expected_state}", ->
          expect(the_gamepad.last_gamepad_state.fire()).toEqual test_conditions.expected_state == 'down'

  fire_down_state_tests = [
    {fire_button: "up",   expected_state: "down"},
    {fire_button: "down", expected_state: "down"}
  ]

  _.each fire_down_state_tests, (test_conditions) ->
    describe "When fire button is #{test_conditions.fire_button}", ->
      beforeEach ->
        createController()
        the_gamepad.last_gamepad_state.fire(test_conditions.fire_button == 'down');

      describe " and we receive button_down", ->
        beforeEach ->
          the_gamepad.interpret_command(make_fake_gamepad(fire: true));

        it "fire button is #{test_conditions.expected_state}", ->
          expect(the_gamepad.last_gamepad_state.fire()).toEqual(test_conditions.expected_state == 'down')

   thrust_up_sent_tests = [
     {thrust_button: "up",   expected_sent: null},
     {thrust_button: "down", expected_sent: 'thrust_off'}
   ]

  _.each thrust_up_sent_tests, (test_conditions) ->
    describe "When thrust button is #{test_conditions.thrust_button}", ->
      beforeEach ->
        createController()
        the_gamepad.last_gamepad_state.thrust(test_conditions.thrust_button == 'down')
        spyOn the_gamepad.command_socket(), "send"

      describe " and we receive up", ->
        beforeEach ->
          the_gamepad.interpret_command(make_fake_gamepad(thrust: false));

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(the_gamepad.command_socket().send).toHaveBeenCalledWith JSON.stringify({command: test_conditions.expected_sent})
        else
          it "does not send", ->
            expect(the_gamepad.command_socket().send).not.toHaveBeenCalled()

  thrust_down_sent_tests = [
    {thrust_button: "up",   expected_sent: 'thrust_on'},
    {thrust_button: "down", expected_sent: null}
  ]

  _.each thrust_down_sent_tests, (test_conditions) ->
    describe "When thrust button is #{test_conditions.thrust_button}", ->
      beforeEach ->
        createController()
        the_gamepad.last_gamepad_state.thrust(test_conditions.thrust_button == 'down')
        spyOn the_gamepad.command_socket(), "send"

      describe " and we receive down", ->
        beforeEach ->
          the_gamepad.interpret_command(make_fake_gamepad(thrust: true));

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(the_gamepad.command_socket().send).toHaveBeenCalledWith JSON.stringify({command: test_conditions.expected_sent})
        else
          it "does not send", ->
            expect(the_gamepad.command_socket().send).not.toHaveBeenCalled()

  thrust_up_state_tests = [
    {thrust_button: "up",   expected_state: "up"},
    {thrust_button: "down", expected_state: "up"}
  ]

  _.each thrust_up_state_tests, (test_conditions) ->
    describe "When thrust button is #{test_conditions.thrust_button}", ->
      beforeEach ->
        createController()
        the_gamepad.last_gamepad_state.thrust(test_conditions.thrust_button == 'down')

      describe " and we receive up", ->
        beforeEach ->
          the_gamepad.interpret_command(make_fake_gamepad(thrust: false));

        it "thrust button is #{test_conditions.expected_state}", ->
          expect(the_gamepad.last_gamepad_state.thrust()).toEqual test_conditions.expected_state == 'down'


  thrust_down_state_tests = [
    {thrust_button: "up",   expected_state: "down"},
    {thrust_button: "down", expected_state: "down"}
  ]

  _.each thrust_down_state_tests, (test_conditions) ->
    describe "When thrust button is #{test_conditions.thrust_button}", ->
      beforeEach ->
        createController()
        the_gamepad.last_gamepad_state.thrust(test_conditions.thrust_button == 'down')

      describe " and we receive button_down", ->
        beforeEach ->
          the_gamepad.interpret_command(make_fake_gamepad(thrust: true));

        it "thrust button is #{test_conditions.expected_state}", ->
          expect(the_gamepad.last_gamepad_state.thrust()).toEqual test_conditions.expected_state == 'down'


  sent_tests = [
    {left_button: "down", right_button: "down", new_left_button: "down", new_right_button: "down", expected_sent: null}
    {left_button: "down", right_button: "down", new_left_button: "down", new_right_button: "up",   expected_sent: "rotate_left"}
    {left_button: "down", right_button: "down", new_left_button: "up",   new_right_button: "down", expected_sent: "rotate_right"}
    {left_button: "down", right_button: "down", new_left_button: "up",   new_right_button: "up",   expected_sent: null}

    {left_button: "down", right_button: "up",   new_left_button: "down", new_right_button: "down", expected_sent: "rotate_stop"}
    {left_button: "down", right_button: "up",   new_left_button: "down", new_right_button: "up",   expected_sent: null}
    {left_button: "down", right_button: "up",   new_left_button: "up",   new_right_button: "down", expected_sent: "rotate_right"}
    {left_button: "down", right_button: "up",   new_left_button: "up",   new_right_button: "up",   expected_sent: "rotate_stop"}

    {left_button: "up",   right_button: "down", new_left_button: "down", new_right_button: "down", expected_sent: "rotate_stop"}
    {left_button: "up",   right_button: "down", new_left_button: "down", new_right_button: "up",   expected_sent: "rotate_left"}
    {left_button: "up",   right_button: "down", new_left_button: "up",   new_right_button: "down", expected_sent: null}
    {left_button: "up",   right_button: "down", new_left_button: "up",   new_right_button: "up",   expected_sent: "rotate_stop"}

    {left_button: "up",   right_button: "up",   new_left_button: "down", new_right_button: "down", expected_sent: null}
    {left_button: "up",   right_button: "up",   new_left_button: "down", new_right_button: "up",   expected_sent: "rotate_left"}
    {left_button: "up",   right_button: "up",   new_left_button: "up",   new_right_button: "down", expected_sent: "rotate_right"}
    {left_button: "up",   right_button: "up",   new_left_button: "up",   new_right_button: "up",   expected_sent: null}
  ]

  _.each sent_tests, (test_conditions) ->
    describe "When left button is #{test_conditions.left_button} and right button is #{test_conditions.right_button}", ->
      controller = undefined
      beforeEach ->
        controller = createController()
        the_gamepad.last_gamepad_state.left(test_conditions.left_button == 'down')
        the_gamepad.last_gamepad_state.right(test_conditions.right_button == 'down')
        spyOn the_gamepad.command_socket(), "send"

      describe "and we receive left #{test_conditions.new_left_button}, right #{test_conditions.new_right_button}", ->
        beforeEach ->
          new_gamepad= make_fake_gamepad(
            left:  (test_conditions.new_left_button == 'down'),
            right: (test_conditions.new_right_button == 'down'))

          the_gamepad.interpret_command(new_gamepad)

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(the_gamepad.command_socket().send).toHaveBeenCalledWith JSON.stringify({command: test_conditions.expected_sent})
        else
          it "does not send", ->
            expect(the_gamepad.command_socket().send).not.toHaveBeenCalled()
