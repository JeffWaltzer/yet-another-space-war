describe "ShipCommandController", ->
  beforeEach module("YASW")

  scope = undefined
  $location = undefined
  createController = undefined
  game_server = undefined
  keyboard= undefined

  beforeEach inject(($rootScope, $controller, _$location_, _game_server_, _keyboard_) ->
    $location = _$location_
    scope = $rootScope.$new()
    createController = ->
      $controller "ShipCommandController",
        $scope: scope
    game_server = _game_server_
    keyboard= _keyboard_
  )

  describe "Initial key states", ->
    controller = undefined
    beforeEach ->
      controller = createController()

    it "start left up", ->
      expect(keyboard.left_key).toBe "up"

    it "start right up", ->
      expect(keyboard.right_key).toBe "up"

    it "start thrust up", ->
      expect(keyboard.thrust_key).toBe "up"

    it "start fire up", ->
      expect(keyboard.fire_key).toBe "up"

  fire_up_sent_tests = [
    {fire_key: "up",   expected_sent: null},
    {fire_key: "down", expected_sent: null}
  ]

  _.each fire_up_sent_tests, (test_conditions) ->
    describe "When fire key is #{test_conditions.fire_key}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        keyboard.fire_key = test_conditions.fire_key
        spyOn game_server, "send"

      describe " and we receive up", ->
        beforeEach ->
          scope.onKeyUp {keyCode: 32}

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
        else
          it "does not send", ->
            expect(game_server.send).not.toHaveBeenCalled()

  fire_down_sent_tests = [
    {fire_key: "up",   expected_sent: 'fire'},
    {fire_key: "down", expected_sent: null}
  ]

  _.each fire_down_sent_tests, (test_conditions) ->
    describe "When fire key is #{test_conditions.fire_key}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        keyboard.fire_key = test_conditions.fire_key
        spyOn game_server, "send"

      describe " and we receive down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 32}

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
        else
          it "does not send", ->
            expect(game_server.send).not.toHaveBeenCalled()

  fire_up_state_tests = [
    {fire_key: "up",   expected_state: "up"},
    {fire_key: "down", expected_state: "up"}
  ]

  _.each fire_up_state_tests, (test_conditions) ->
    describe "When fire key is #{test_conditions.fire_key}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        keyboard.fire_key = test_conditions.fire_key

      describe " and we receive up", ->
        beforeEach ->
          scope.onKeyUp {keyCode: 32}
        it "fire key is #{test_conditions.expected_state}", ->
            expect(keyboard.fire_key).toEqual test_conditions.expected_state

  fire_down_state_tests = [
    {fire_key: "up",   expected_state: "down"},
    {fire_key: "down", expected_state: "down"}
  ]

  _.each fire_down_state_tests, (test_conditions) ->
    describe "When fire key is #{test_conditions.fire_key}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        keyboard.fire_key = test_conditions.fire_key

      describe " and we receive key_down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 32}
        it "fire key is #{test_conditions.expected_state}", ->
            expect(keyboard.fire_key).toEqual test_conditions.expected_state


  thrust_up_sent_tests = [
    {thrust_key: "up",   expected_sent: null},
    {thrust_key: "down", expected_sent: 'thrust_off'}
  ]

  _.each thrust_up_sent_tests, (test_conditions) ->
    describe "When thrust key is #{test_conditions.thrust_key}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        keyboard.thrust_key = test_conditions.thrust_key
        spyOn game_server, "send"

      describe " and we receive up", ->
        beforeEach ->
          scope.onKeyUp {keyCode: 40}

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
        else
          it "does not send", ->
            expect(game_server.send).not.toHaveBeenCalled()

  thrust_down_sent_tests = [
    {thrust_key: "up",   expected_sent: 'thrust_on'},
    {thrust_key: "down", expected_sent: null}
  ]

  _.each thrust_down_sent_tests, (test_conditions) ->
    describe "When thrust key is #{test_conditions.thrust_key}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        keyboard.thrust_key = test_conditions.thrust_key
        spyOn game_server, "send"

      describe " and we receive down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 40}

        if test_conditions.expected_sent
          it "sends #{test_conditions.expected_sent}", ->
            expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
        else
          it "does not send", ->
            expect(game_server.send).not.toHaveBeenCalled()

  thrust_up_state_tests = [
    {thrust_key: "up",   expected_state: "up"},
    {thrust_key: "down", expected_state: "up"}
  ]

  _.each thrust_up_state_tests, (test_conditions) ->
    describe "When thrust key is #{test_conditions.thrust_key}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        keyboard.thrust_key = test_conditions.thrust_key

      describe " and we receive up", ->
        beforeEach ->
          scope.onKeyUp {keyCode: 40}
        it "thrust key is #{test_conditions.expected_state}", ->
            expect(keyboard.thrust_key).toEqual test_conditions.expected_state

  thrust_down_state_tests = [
    {thrust_key: "up",   expected_state: "down"},
    {thrust_key: "down", expected_state: "down"}
  ]

  _.each thrust_down_state_tests, (test_conditions) ->
    describe "When thrust key is #{test_conditions.thrust_key}", ->
      controller= undefined
      beforeEach ->
        controller = createController()
        keyboard.thrust_key = test_conditions.thrust_key

      describe " and we receive key_down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 40}
        it "thrust key is #{test_conditions.expected_state}", ->
            expect(keyboard.thrust_key).toEqual test_conditions.expected_state


  up_sent_tests = [
    {left_key: "down", right_key: "down", event: "right",   expected_sent: "rotate_left"}
    {left_key: "down", right_key: "down", event: "left",    expected_sent: "rotate_right"}
    {left_key: "up",   right_key: "down", event: "right",   expected_sent: "rotate_stop"}
    {left_key: "down", right_key: "up",   event: "left",    expected_sent: "rotate_stop"}
    {left_key: "up",   right_key: "up",   event: "left",    expected_sent: null}
    {left_key: "up",   right_key: "down", event: "left",    expected_sent: null}
    {left_key: "up",   right_key: "up",   event: "right",   expected_sent: null}
    {left_key: "down", right_key: "up",   event: "right",   expected_sent: null}
  ]

  _.each up_sent_tests, (test_conditions) ->
    describe "When left key is #{test_conditions.left_key}", ->
      controller = undefined
      beforeEach ->
        controller = createController()
        keyboard.left_key = test_conditions.left_key
        spyOn game_server, "send"

      describe " and right key is #{test_conditions.right_key}", ->
        beforeEach ->
          keyboard.right_key = test_conditions.right_key

        describe " and we receive #{test_conditions.event}", ->
          beforeEach ->
            if (test_conditions.event == 'left')
              key_code= 37
            else
              key_code= 39
            scope.onKeyUp {keyCode: key_code}

          if test_conditions.expected_sent
            it "sends #{test_conditions.expected_sent}", ->
              expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent

          else
            it "does not send", ->
              expect(game_server.send).not.toHaveBeenCalled()

  down_sent_tests = [
    {left_key: "up",   right_key: "up",   event: "left",  expected_sent: "rotate_left"}
    {left_key: "up",   right_key: "up",   event: "right", expected_sent: "rotate_right"}
    {left_key: "up",   right_key: "down", event: "left",  expected_sent: "rotate_stop"}
    {left_key: "down", right_key: "up",   event: "right", expected_sent: "rotate_stop"}
    {left_key: "up",   right_key: "down", event: "right", expected_sent: null}
    {left_key: "down", right_key: "up",   event: "left",  expected_sent: null}
    {left_key: "down", right_key: "down", event: "left",  expected_sent: null}
    {left_key: "down", right_key: "down", event: "right", expected_sent: null}
  ]

  _.each down_sent_tests, (test_conditions) ->
    describe "When left key is #{test_conditions.left_key}", ->
      controller = undefined
      beforeEach ->
        controller = createController()
        keyboard.left_key = test_conditions.left_key
        spyOn game_server, "send"

      describe " and right key is #{test_conditions.right_key}", ->
        beforeEach ->
          keyboard.right_key = test_conditions.right_key

        describe " and we receive #{test_conditions.event}", ->
          beforeEach ->
            if (test_conditions.event == 'left')
              key_code= 37
            else
              key_code= 39
            scope.onKeyDown {keyCode: key_code}

          if test_conditions.expected_sent
            it "sends #{test_conditions.expected_sent}", ->
              expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent

          else
            it "does not send", ->
              expect(game_server.send).not.toHaveBeenCalled()


  up_state_tests = [
    {left_key: "up",   right_key: "up",   event: "left",    expected_left_key_state: "up",   expected_right_key_state: "up"}
    {left_key: "up",   right_key: "up",   event: "right",   expected_left_key_state: "up",   expected_right_key_state: "up"}
    {left_key: "up",   right_key: "down", event: "left",    expected_left_key_state: "up",   expected_right_key_state: "down"}
    {left_key: "up",   right_key: "down", event: "right",   expected_left_key_state: "up",   expected_right_key_state: "up"}
    {left_key: "down", right_key: "up",   event: "left",    expected_left_key_state: "up",   expected_right_key_state: "up"}
    {left_key: "down", right_key: "up",   event: "right",   expected_left_key_state: "down", expected_right_key_state: "up"}
    {left_key: "down", right_key: "down", event: "left",    expected_left_key_state: "up",   expected_right_key_state: "down"}
    {left_key: "down", right_key: "down", event: "right",   expected_left_key_state: "down", expected_right_key_state: "up"}
  ]
  _.each up_state_tests, (test_conditions) ->
     describe "When left key is #{test_conditions.left_key}", ->
      controller = undefined
      beforeEach ->
        controller = createController()
        keyboard.left_key = test_conditions.left_key

       describe " and right key is #{test_conditions.right_key}", ->
        beforeEach ->
          keyboard.right_key = test_conditions.right_key

        describe " and we receive #{test_conditions.event}", ->
          beforeEach ->
            if (test_conditions.event == 'left')
              key_code= 37
            else
              key_code= 39
            scope.onKeyUp {keyCode: key_code}

           it "right key is #{test_conditions.expected_right_key_state}", ->
            expect(keyboard.right_key).toEqual test_conditions.expected_right_key_state

          it "left key is #{test_conditions.expected_left_key_state}", ->
            expect(keyboard.left_key).toEqual test_conditions.expected_left_key_state


  down_state_tests = [
    {left_key: "up",   right_key: "up",   event: "left",  expected_left_key_state: "down", expected_right_key_state: "up"}
    {left_key: "up",   right_key: "up",   event: "right", expected_left_key_state: "up",   expected_right_key_state: "down"}
    {left_key: "up",   right_key: "down", event: "left",  expected_left_key_state: "down", expected_right_key_state: "down"}
    {left_key: "up",   right_key: "down", event: "right", expected_left_key_state: "up",   expected_right_key_state: "down"}
    {left_key: "down", right_key: "up",   event: "left",  expected_left_key_state: "down", expected_right_key_state: "up"}
    {left_key: "down", right_key: "up",   event: "right", expected_left_key_state: "down", expected_right_key_state: "down"}
    {left_key: "down", right_key: "down", event: "left",  expected_left_key_state: "down", expected_right_key_state: "down"}
    {left_key: "down", right_key: "down", event: "right", expected_left_key_state: "down", expected_right_key_state: "down"}
  ]
  _.each down_state_tests, (test_conditions) ->
     describe "When left key is #{test_conditions.left_key}", ->
      controller = undefined
      beforeEach ->
        controller = createController()
        keyboard.left_key = test_conditions.left_key

       describe " and right key is #{test_conditions.right_key}", ->
        beforeEach ->
          keyboard.right_key = test_conditions.right_key

         describe " and we receive #{test_conditions.event}", ->
          beforeEach ->
            if (test_conditions.event == 'left')
              key_code= 37
            else
              key_code= 39
            scope.onKeyDown {keyCode: key_code}

          it "right key is #{test_conditions.expected_right_key_state}", ->
            expect(keyboard.right_key).toEqual test_conditions.expected_right_key_state

          it "left key is #{test_conditions.expected_left_key_state}", ->
            expect(keyboard.left_key).toEqual test_conditions.expected_left_key_state

  describe "we receive clone_key_down", ->
    controller= undefined
    beforeEach ->
      controller = createController()
      spyOn game_server, "send"
      scope.onKeyDown {keyCode: 83}

    it "sends 'clone'", ->
      expect(game_server.send).toHaveBeenCalledWith 'clone'
