describe "ShipCommandController", ->
  beforeEach module("YASW")
  scope = undefined
  $location = undefined
  createController = undefined
  game_server = undefined
  beforeEach inject(($rootScope, $controller, _$location_, _game_server_) ->
    $location = _$location_
    scope = $rootScope.$new()
    createController = ->
      $controller "ShipCommandController",
        $scope: scope
    game_server = _game_server_
  )

  describe "Initial key states", ->
    controller = undefined
    beforeEach ->
      controller = createController()

    it "start left up", ->
      expect(scope.left_key).toBe "up"

    it "start right up", ->
      expect(scope.right_key).toBe "up"

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
        scope.left_key = test_conditions.left_key
        spyOn game_server, "send"

      describe " and right key is #{test_conditions.right_key}", ->
        beforeEach ->
          scope.right_key = test_conditions.right_key

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
        scope.left_key = test_conditions.left_key
        spyOn game_server, "send"

      describe " and right key is #{test_conditions.right_key}", ->
        beforeEach ->
          scope.right_key = test_conditions.right_key

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
        scope.left_key = test_conditions.left_key

       describe " and right key is #{test_conditions.right_key}", ->
        beforeEach ->
          scope.right_key = test_conditions.right_key

        describe " and we receive #{test_conditions.event}", ->
          beforeEach ->
            if (test_conditions.event == 'left')
              key_code= 37
            else
              key_code= 39
            scope.onKeyUp {keyCode: key_code}

           it "right key is #{test_conditions.expected_right_key_state}", ->
            expect(scope.right_key).toEqual test_conditions.expected_right_key_state

          it "left key is #{test_conditions.expected_left_key_state}", ->
            expect(scope.left_key).toEqual test_conditions.expected_left_key_state


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
        scope.left_key = test_conditions.left_key

       describe " and right key is #{test_conditions.right_key}", ->
        beforeEach ->
          scope.right_key = test_conditions.right_key

         describe " and we receive #{test_conditions.event}", ->
          beforeEach ->
            if (test_conditions.event == 'left')
              key_code= 37
            else
              key_code= 39
            scope.onKeyDown {keyCode: key_code}

          it "right key is #{test_conditions.expected_right_key_state}", ->
            expect(scope.right_key).toEqual test_conditions.expected_right_key_state

          it "left key is #{test_conditions.expected_left_key_state}", ->
            expect(scope.left_key).toEqual test_conditions.expected_left_key_state
