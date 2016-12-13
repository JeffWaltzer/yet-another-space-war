describe "ShipCommandController", ->
  beforeEach module("YASW")

  scope = undefined
  $location = undefined
  createController = undefined
  game_server = undefined
  gamepad= undefined

  make_fake_gamepad= (button_values) -> 
    gamepad= {buttons: []}
    _(button_values).each (value, key) ->
      gamepad['buttons'][key]= value

  beforeEach inject(($rootScope, $controller, _$location_, _game_server_, _gamepad_) ->
    $location = _$location_
    scope = $rootScope.$new()
    createController = ->
      $controller "ShipCommandController",
        $scope: scope
    game_server = _game_server_
    gamepad= _gamepad_
  )

  describe "Initial button states", ->
    it "start left up", ->
      expect(gamepad.left_button).toBe "up"

    it "start right up", ->
      expect(gamepad.right_button).toBe "up"

    it "start thrust up", ->
      expect(gamepad.thrust_button).toBe "up"

    it "start fire up", ->
      expect(gamepad.fire_button).toBe "up"

  fire_up_sent_tests = [
    {buttons: {fire: 'up'}, expected_sent: null},
    {buttons: {fire: 'down'}, expected_sent: null},
  ]

  _.each fire_up_sent_tests, (test_conditions) ->
    describe "When the fire button is #{test_conditions.buttons.fire}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        gamepad.fire_button = test_conditions.buttons.fire
        spyOn game_server, "send"

      describe " and we receive up", ->
        beforeEach ->
          scope.interpret_gamepad(make_fake_gamepad(fire: 'up'));

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
        else
          it "does not send", ->
            expect(game_server.send).not.toHaveBeenCalled()

  # fire_down_sent_tests = [
  #   {fire_button: "up",   expected_sent: 'fire'},
  #   {fire_button: "down", expected_sent: null}
  # ]

  # _.each fire_down_sent_tests, (test_conditions) ->
  #   describe "When fire button is #{test_conditions.fire_button}", ->
  #     controller= undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.fire_button = test_conditions.fire_button
  #       spyOn game_server, "send"

  #     describe " and we receive down", ->
  #       beforeEach ->
  #         scope.onButtonDown {buttonCode: 32}

  #       if test_conditions.expected_sent
  #         it "sends #{test_conditions.expected_sent}", ->
  #           expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
  #       else
  #         it "does not send", ->
  #           expect(game_server.send).not.toHaveBeenCalled()

  # fire_up_state_tests = [
  #   {fire_button: "up",   expected_state: "up"},
  #   {fire_button: "down", expected_state: "up"}
  # ]

  # _.each fire_up_state_tests, (test_conditions) ->
  #   describe "When fire button is #{test_conditions.fire_button}", ->
  #     controller= undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.fire_button = test_conditions.fire_button

  #     describe " and we receive up", ->
  #       beforeEach ->
  #         scope.onButtonUp {buttonCode: 32}
  #       it "fire button is #{test_conditions.expected_state}", ->
  #           expect(gamepad.fire_button).toEqual test_conditions.expected_state

  # fire_down_state_tests = [
  #   {fire_button: "up",   expected_state: "down"},
  #   {fire_button: "down", expected_state: "down"}
  # ]

  # _.each fire_down_state_tests, (test_conditions) ->
  #   describe "When fire button is #{test_conditions.fire_button}", ->
  #     controller= undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.fire_button = test_conditions.fire_button

  #     describe " and we receive button_down", ->
  #       beforeEach ->
  #         scope.onButtonDown {buttonCode: 32}
  #       it "fire button is #{test_conditions.expected_state}", ->
  #           expect(gamepad.fire_button).toEqual test_conditions.expected_state


  # thrust_up_sent_tests = [
  #   {thrust_button: "up",   expected_sent: null},
  #   {thrust_button: "down", expected_sent: 'thrust_off'}
  # ]

  # _.each thrust_up_sent_tests, (test_conditions) ->
  #   describe "When thrust button is #{test_conditions.thrust_button}", ->
  #     controller= undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.thrust_button = test_conditions.thrust_button
  #       spyOn game_server, "send"

  #     describe " and we receive up", ->
  #       beforeEach ->
  #         scope.onButtonUp {buttonCode: 40}

  #       if test_conditions.expected_sent
  #         it "sends #{test_conditions.expected_sent}", ->
  #           expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
  #       else
  #         it "does not send", ->
  #           expect(game_server.send).not.toHaveBeenCalled()

  # thrust_down_sent_tests = [
  #   {thrust_button: "up",   expected_sent: 'thrust_on'},
  #   {thrust_button: "down", expected_sent: null}
  # ]

  # _.each thrust_down_sent_tests, (test_conditions) ->
  #   describe "When thrust button is #{test_conditions.thrust_button}", ->
  #     controller= undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.thrust_button = test_conditions.thrust_button
  #       spyOn game_server, "send"

  #     describe " and we receive down", ->
  #       beforeEach ->
  #         scope.onButtonDown {buttonCode: 40}

  #       if test_conditions.expected_sent
  #         it "sends #{test_conditions.expected_sent}", ->
  #           expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
  #       else
  #         it "does not send", ->
  #           expect(game_server.send).not.toHaveBeenCalled()

  # thrust_up_state_tests = [
  #   {thrust_button: "up",   expected_state: "up"},
  #   {thrust_button: "down", expected_state: "up"}
  # ]

  # _.each thrust_up_state_tests, (test_conditions) ->
  #   describe "When thrust button is #{test_conditions.thrust_button}", ->
  #     controller= undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.thrust_button = test_conditions.thrust_button

  #     describe " and we receive up", ->
  #       beforeEach ->
  #         scope.onButtonUp {buttonCode: 40}
  #       it "thrust button is #{test_conditions.expected_state}", ->
  #           expect(gamepad.thrust_button).toEqual test_conditions.expected_state

  # thrust_down_state_tests = [
  #   {thrust_button: "up",   expected_state: "down"},
  #   {thrust_button: "down", expected_state: "down"}
  # ]

  # _.each thrust_down_state_tests, (test_conditions) ->
  #   describe "When thrust button is #{test_conditions.thrust_button}", ->
  #     controller= undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.thrust_button = test_conditions.thrust_button

  #     describe " and we receive button_down", ->
  #       beforeEach ->
  #         scope.onButtonDown {buttonCode: 40}
  #       it "thrust button is #{test_conditions.expected_state}", ->
  #           expect(gamepad.thrust_button).toEqual test_conditions.expected_state


  # up_sent_tests = [
  #   {left_button: "down", right_button: "down", event: "right",   expected_sent: "rotate_left"}
  #   {left_button: "down", right_button: "down", event: "left",    expected_sent: "rotate_right"}
  #   {left_button: "up",   right_button: "down", event: "right",   expected_sent: "rotate_stop"}
  #   {left_button: "down", right_button: "up",   event: "left",    expected_sent: "rotate_stop"}
  #   {left_button: "up",   right_button: "up",   event: "left",    expected_sent: null}
  #   {left_button: "up",   right_button: "down", event: "left",    expected_sent: null}
  #   {left_button: "up",   right_button: "up",   event: "right",   expected_sent: null}
  #   {left_button: "down", right_button: "up",   event: "right",   expected_sent: null}
  # ]

  # _.each up_sent_tests, (test_conditions) ->
  #   describe "When left button is #{test_conditions.left_button}", ->
  #     controller = undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.left_button = test_conditions.left_button
  #       spyOn game_server, "send"

  #     describe " and right button is #{test_conditions.right_button}", ->
  #       beforeEach ->
  #         gamepad.right_button = test_conditions.right_button

  #       describe " and we receive #{test_conditions.event}", ->
  #         beforeEach ->
  #           if (test_conditions.event == 'left')
  #             button_code= 37
  #           else
  #             button_code= 39
  #           scope.onButtonUp {buttonCode: button_code}

  #         if test_conditions.expected_sent
  #           it "sends #{test_conditions.expected_sent}", ->
  #             expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent

  #         else
  #           it "does not send", ->
  #             expect(game_server.send).not.toHaveBeenCalled()

  # down_sent_tests = [
  #   {left_button: "up",   right_button: "up",   event: "left",  expected_sent: "rotate_left"}
  #   {left_button: "up",   right_button: "up",   event: "right", expected_sent: "rotate_right"}
  #   {left_button: "up",   right_button: "down", event: "left",  expected_sent: "rotate_stop"}
  #   {left_button: "down", right_button: "up",   event: "right", expected_sent: "rotate_stop"}
  #   {left_button: "up",   right_button: "down", event: "right", expected_sent: null}
  #   {left_button: "down", right_button: "up",   event: "left",  expected_sent: null}
  #   {left_button: "down", right_button: "down", event: "left",  expected_sent: null}
  #   {left_button: "down", right_button: "down", event: "right", expected_sent: null}
  # ]

  # _.each down_sent_tests, (test_conditions) ->
  #   describe "When left button is #{test_conditions.left_button}", ->
  #     controller = undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.left_button = test_conditions.left_button
  #       spyOn game_server, "send"

  #     describe " and right button is #{test_conditions.right_button}", ->
  #       beforeEach ->
  #         gamepad.right_button = test_conditions.right_button

  #       describe " and we receive #{test_conditions.event}", ->
  #         beforeEach ->
  #           if (test_conditions.event == 'left')
  #             button_code= 37
  #           else
  #             button_code= 39
  #           scope.onButtonDown {buttonCode: button_code}

  #         if test_conditions.expected_sent
  #           it "sends #{test_conditions.expected_sent}", ->
  #             expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent

  #         else
  #           it "does not send", ->
  #             expect(game_server.send).not.toHaveBeenCalled()


  # up_state_tests = [
  #   {left_button: "up",   right_button: "up",   event: "left",    expected_left_button_state: "up",   expected_right_button_state: "up"}
  #   {left_button: "up",   right_button: "up",   event: "right",   expected_left_button_state: "up",   expected_right_button_state: "up"}
  #   {left_button: "up",   right_button: "down", event: "left",    expected_left_button_state: "up",   expected_right_button_state: "down"}
  #   {left_button: "up",   right_button: "down", event: "right",   expected_left_button_state: "up",   expected_right_button_state: "up"}
  #   {left_button: "down", right_button: "up",   event: "left",    expected_left_button_state: "up",   expected_right_button_state: "up"}
  #   {left_button: "down", right_button: "up",   event: "right",   expected_left_button_state: "down", expected_right_button_state: "up"}
  #   {left_button: "down", right_button: "down", event: "left",    expected_left_button_state: "up",   expected_right_button_state: "down"}
  #   {left_button: "down", right_button: "down", event: "right",   expected_left_button_state: "down", expected_right_button_state: "up"}
  # ]
  # _.each up_state_tests, (test_conditions) ->
  #    describe "When left button is #{test_conditions.left_button}", ->
  #     controller = undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.left_button = test_conditions.left_button

  #      describe " and right button is #{test_conditions.right_button}", ->
  #       beforeEach ->
  #         gamepad.right_button = test_conditions.right_button

  #       describe " and we receive #{test_conditions.event}", ->
  #         beforeEach ->
  #           if (test_conditions.event == 'left')
  #             button_code= 37
  #           else
  #             button_code= 39
  #           scope.onButtonUp {buttonCode: button_code}

  #          it "right button is #{test_conditions.expected_right_button_state}", ->
  #           expect(gamepad.right_button).toEqual test_conditions.expected_right_button_state

  #         it "left button is #{test_conditions.expected_left_button_state}", ->
  #           expect(gamepad.left_button).toEqual test_conditions.expected_left_button_state


  # down_state_tests = [
  #   {left_button: "up",   right_button: "up",   event: "left",  expected_left_button_state: "down", expected_right_button_state: "up"}
  #   {left_button: "up",   right_button: "up",   event: "right", expected_left_button_state: "up",   expected_right_button_state: "down"}
  #   {left_button: "up",   right_button: "down", event: "left",  expected_left_button_state: "down", expected_right_button_state: "down"}
  #   {left_button: "up",   right_button: "down", event: "right", expected_left_button_state: "up",   expected_right_button_state: "down"}
  #   {left_button: "down", right_button: "up",   event: "left",  expected_left_button_state: "down", expected_right_button_state: "up"}
  #   {left_button: "down", right_button: "up",   event: "right", expected_left_button_state: "down", expected_right_button_state: "down"}
  #   {left_button: "down", right_button: "down", event: "left",  expected_left_button_state: "down", expected_right_button_state: "down"}
  #   {left_button: "down", right_button: "down", event: "right", expected_left_button_state: "down", expected_right_button_state: "down"}
  # ]
  # _.each down_state_tests, (test_conditions) ->
  #    describe "When left button is #{test_conditions.left_button}", ->
  #     controller = undefined
  #     beforeEach ->
  #       controller = createController()
  #       gamepad.left_button = test_conditions.left_button

  #      describe " and right button is #{test_conditions.right_button}", ->
  #       beforeEach ->
  #         gamepad.right_button = test_conditions.right_button

  #        describe " and we receive #{test_conditions.event}", ->
  #         beforeEach ->
  #           if (test_conditions.event == 'left')
  #             button_code= 37
  #           else
  #             button_code= 39
  #           scope.onButtonDown {buttonCode: button_code}

  #         it "right button is #{test_conditions.expected_right_button_state}", ->
  #           expect(gamepad.right_button).toEqual test_conditions.expected_right_button_state

  #         it "left button is #{test_conditions.expected_left_button_state}", ->
  #           expect(gamepad.left_button).toEqual test_conditions.expected_left_button_state

  # describe "we receive clone_button_down", ->
  #   controller= undefined
  #   beforeEach ->
  #     controller = createController()
  #     spyOn game_server, "send"
  #     scope.onButtonDown {buttonCode: 82}

  #   it "sends 'clone'", ->
  #     expect(game_server.send).toHaveBeenCalledWith 'clone'
