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

  beforeEach ->
    createController()

  describe "The  gamepad editor default state", ->
    it "the editor is not shown", ->
      expect(scope.gamepad_editor_visible).toBe(false)

    it "the hotkey is up", ->
      expect(keyboard.gamepad_editor_hotkey).toBe('up')

  describe "When the gamepad editor is not shown", ->
    beforeEach ->
      scope.gamepad_editor_visible= false

    describe " and the gampad editor hotkey is up", ->
      beforeEach ->
        keyboard.gampad_editor_hotkey= "up"

      describe " and we receive down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 71}

        it "shows the gamepad editor", ->
          expect(scope.gamepad_editor_visible).toBe(true)

    describe " and the gampad editor hotkey is down", ->
      beforeEach ->
        keyboard.gampad_editor_hotkey= "down"

      describe " and we receive down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 71}

        it "shows the gamepad editor", ->
          expect(scope.gamepad_editor_visible).toBe(false)

  describe "When the gamepad editor is shown", ->
    beforeEach ->
      scope.gamepad_editor_visible= true

    describe " and the gampad editor hotkey is up", ->
      beforeEach ->
        keyboard.gampad_editor_hotkey= "up"

      describe " and we receive down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 71}

        it "hides the gamepad editor", ->
          expect(scope.gamepad_editor_visible).toBe(false)

    describe " and the gampad editor hotkey is down", ->
      beforeEach ->
        keyboard.gampad_editor_hotkey= "down"

      describe " and we receive down", ->
        beforeEach ->
          scope.onKeyDown {keyCode: 71}

        it "hides the gamepad editor", ->
          expect(scope.gamepad_editor_visible).toBe(true)
