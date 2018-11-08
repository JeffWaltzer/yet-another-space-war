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

    spyOn(navigator, 'getGamepads').and.returnValue([])

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

    spyOn(navigator, 'getGamepads').and.returnValue('{"hi there": "ferd"}')
    
    gamepad_editor= compile(angular.element("<gamepad-editor/>"))(scope)[0]
    scope.$digest()

  it "has one gamepad displayed", ->
    expect(gamepad_editor.textContent).not.toEqual("No Gamepads")
