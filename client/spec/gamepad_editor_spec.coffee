describe "the gamepad editor display without any gamepads", ->
  scope= null
  compile= null
  gamepad_editor= null

  beforeEach ->
    module("YASW")
    inject(($compile, $rootScope) ->
      compile= $compile
      scope= $rootScope.$new()
    )

    scope.gamepads= []
    scope.gamepad_editor_visible= true;
    gamepad_editor= compile(angular.element("<gamepad-editor/>"))(scope)[0]
    scope.$digest()

  it "exists", ->
    expect(gamepad_editor.nodeName).toEqual('DIV')

  it "has 'no gamepads' displayed", ->
    expect(gamepad_editor.textContent).toEqual("No Gamepads")


describe "the gamepad editor display with a gamepad", ->
  scope= null
  compile= null
  gamepad_editor= null

  beforeEach ->
    module("YASW")
    inject(($compile, $rootScope) ->
      compile= $compile
      scope= $rootScope.$new()
    )

    scope.gamepads= [
        {
            id: "Fake Gamepad #1"
            buttons: [ 
                {pressed: false},
                {pressed: false},
                {pressed: false},
                {pressed: false},
                {pressed: false},
                {pressed: false},
                {pressed: false},
                {pressed: false},
             ]
        }
    ]
    scope.gamepad_editor_visible= true;
    gamepad_editor= compile(angular.element("<gamepad-editor/>"))(scope)[0]
    scope.$digest()

  it "doesn't have the 'no gamepads' message", ->
    expect(gamepad_editor.textContent).not.toEqual("No Gamepads")

  it "has the gamepad displayed", ->
    expect(gamepad_editor.textContent).toEqual("Fake Gamepad #1")
