describe "The  gamepad editor default state", ->
  it " is not shown", ->
    expect(scope.gamepad_editor_visible).toBeFalse()

describe "When the gamepad editor is not shown", ->
  describe " and the gampad editor hotkey is up", ->
    controller= undefined
    beforeEach ->
      controller = createController()
      keyboard.gampad_editor_hotkey= "up"

    describe " and we receive down", ->
      beforeEach ->
        scope.onKeyUp {keyCode: 42} # fix the keycode

      it "shows the gamepad editor", ->
        expect(scope.gamepad_editor_visible).toBeTrue()

describe "When the gamepad editor is shown", ->
  describe " and the gampad editor hotkey is up", ->
    controller= undefined
    beforeEach ->
      controller = createController()
      keyboard.gampad_editor_hotkey= "up"

    describe " and we receive down", ->
      beforeEach ->
        scope.onKeyUp {keyCode: 42} # fix the keycode

      it "hides the gamepad editor", ->
        expect(scope.gamepad_editor_visible).toBeFalse()
