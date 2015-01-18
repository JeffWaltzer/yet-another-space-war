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
    return
  )
  describe "Initial key states", ->
    controller = undefined
    beforeEach ->
      controller = createController()
      return

    it "start left up", ->
      expect(scope.left_key).toBe "up"
      return

    it "start right up", ->
      expect(scope.right_key).toBe "up"
      return

    return

  sent_tests = [
    {
      left_key: "up"
      right_key: "up"
      event: "left_down"
      expected_sent: "rotate_left"
    }
    {
      left_key: "down"
      right_key: "down"
      event: "right_up"
      expected_sent: "rotate_left"
    }
    {
      left_key: "up"
      right_key: "up"
      event: "right_down"
      expected_sent: "rotate_right"
    }
    {
      left_key: "down"
      right_key: "down"
      event: "left_up"
      expected_sent: "rotate_right"
    }
    {
      left_key: "up"
      right_key: "down"
      event: "left_down"
      expected_sent: "rotate_stop"
    }
    {
      left_key: "up"
      right_key: "down"
      event: "right_up"
      expected_sent: "rotate_stop"
    }
    {
      left_key: "down"
      right_key: "up"
      event: "left_up"
      expected_sent: "rotate_stop"
    }
    {
      left_key: "down"
      right_key: "up"
      event: "right_down"
      expected_sent: "rotate_stop"
    }
    {
      left_key: "up"
      right_key: "up"
      event: "left_up"
      expected_sent: null
    }
    {
      left_key: "up"
      right_key: "down"
      event: "left_up"
      expected_sent: null
    }
    {
      left_key: "up"
      right_key: "up"
      event: "right_up"
      expected_sent: null
    }
    {
      left_key: "up"
      right_key: "down"
      event: "right_down"
      expected_sent: null
    }
    {
      left_key: "down"
      right_key: "up"
      event: "left_down"
      expected_sent: null
    }
    {
      left_key: "down"
      right_key: "down"
      event: "left_down"
      expected_sent: null
    }
    {
      left_key: "down"
      right_key: "up"
      event: "right_up"
      expected_sent: null
    }
    {
      left_key: "down"
      right_key: "down"
      event: "right_down"
      expected_sent: null
    }
  ]
  _.each sent_tests, (test_conditions) ->
    describe "When left key is " + test_conditions.left_key, ->
      controller = undefined
      beforeEach ->
        controller = createController()
        scope.left_key = test_conditions.left_key
        spyOn game_server, "send"
        return

      describe " and right key is " + test_conditions.right_key, ->
        beforeEach ->
          scope.right_key = test_conditions.right_key
          return

        describe " and we receive " + test_conditions.event, ->
          beforeEach ->
            scope.onKeyEvent test_conditions.event
            return

          if test_conditions.expected_sent
            it "sends " + test_conditions.expected_sent, ->
              expect(game_server.send).toHaveBeenCalledWith test_conditions.expected_sent
              return

          else
            it "does not send", ->
              expect(game_server.send).not.toHaveBeenCalled()
              return

          return

        return

      return

    return

  state_tests = [
    {
      left_key: "up"
      right_key: "up"
      event: "left_down"
      expected_left_key_state: "down"
      expected_right_key_state: "up"
    }
    {
      left_key: "up"
      right_key: "up"
      event: "left_up"
      expected_left_key_state: "up"
      expected_right_key_state: "up"
    }
    {
      left_key: "up"
      right_key: "up"
      event: "right_down"
      expected_left_key_state: "up"
      expected_right_key_state: "down"
    }
    {
      left_key: "up"
      right_key: "up"
      event: "right_up"
      expected_left_key_state: "up"
      expected_right_key_state: "up"
    }
    {
      left_key: "up"
      right_key: "down"
      event: "left_down"
      expected_left_key_state: "down"
      expected_right_key_state: "down"
    }
    {
      left_key: "up"
      right_key: "down"
      event: "left_up"
      expected_left_key_state: "up"
      expected_right_key_state: "down"
    }
    {
      left_key: "up"
      right_key: "down"
      event: "right_down"
      expected_left_key_state: "up"
      expected_right_key_state: "down"
    }
    {
      left_key: "up"
      right_key: "down"
      event: "right_up"
      expected_left_key_state: "up"
      expected_right_key_state: "up"
    }
    {
      left_key: "down"
      right_key: "up"
      event: "left_down"
      expected_left_key_state: "down"
      expected_right_key_state: "up"
    }
    {
      left_key: "down"
      right_key: "up"
      event: "left_up"
      expected_left_key_state: "up"
      expected_right_key_state: "up"
    }
    {
      left_key: "down"
      right_key: "up"
      event: "right_down"
      expected_left_key_state: "down"
      expected_right_key_state: "down"
    }
    {
      left_key: "down"
      right_key: "up"
      event: "right_up"
      expected_left_key_state: "down"
      expected_right_key_state: "up"
    }
    {
      left_key: "down"
      right_key: "down"
      event: "left_down"
      expected_left_key_state: "down"
      expected_right_key_state: "down"
    }
    {
      left_key: "down"
      right_key: "down"
      event: "left_up"
      expected_left_key_state: "up"
      expected_right_key_state: "down"
    }
    {
      left_key: "down"
      right_key: "down"
      event: "right_down"
      expected_left_key_state: "down"
      expected_right_key_state: "down"
    }
    {
      left_key: "down"
      right_key: "down"
      event: "right_up"
      expected_left_key_state: "down"
      expected_right_key_state: "up"
    }
  ]
  _.each state_tests, (test_conditions) ->
    describe "When left key is " + test_conditions.left_key, ->
      controller = undefined
      beforeEach ->
        controller = createController()
        scope.left_key = test_conditions.left_key
        return

      describe " and right key is " + test_conditions.right_key, ->
        beforeEach ->
          scope.right_key = test_conditions.right_key
          return

        describe " and we receive " + test_conditions.event, ->
          beforeEach ->
            scope.onKeyEvent test_conditions.event
            return

          it "right key is " + test_conditions.expected_right_key_state, ->
            expect(scope.right_key).toEqual test_conditions.expected_right_key_state
            return

          it "left key is " + test_conditions.expected_left_key_state, ->
            expect(scope.left_key).toEqual test_conditions.expected_left_key_state
            return

          return

        return

      return

    return

  return
