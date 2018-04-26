describe "The gamepad editor", ->
  beforeEach module("YASW")

  scope= undefined
  keyboard= undefined
  createController = undefined

  beforeEach inject(($rootScope, $controller, _keyboard_)->
    keyboard= _keyboard_
    scope= $rootScope.$new()
    createController = ->
      $controller "ShipCommandController",
        $scope: scope
  )

  describe "The  gamepad editor default state", ->
    beforeEach ->
      createController()

    it " is not shown", ->
      expect(scope.gamepad_editor_visible).toBe(false)

  describe "When the gamepad editor is not shown", ->
    describe " and the gampad editor hotkey is up", ->
      beforeEach ->
        createController()
        keyboard.gampad_editor_hotkey= "up"

      describe " and we receive down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 71}

        it "shows the gamepad editor", ->
          expect(scope.gamepad_editor_visible).toBe(true)

  describe "When the gamepad editor is shown", ->
    describe " and the gampad editor hotkey is up", ->
      beforeEach ->
        createController()
        scope.gamepad_editor_visible= true
        keyboard.gampad_editor_hotkey= "up"

      describe " and we receive down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 71}

        it "hides the gamepad editor", ->
          expect(scope.gamepad_editor_visible).toBe(false)
