describe "the gamepad editor display", ->
  scope= null
  compile= null
  gamepad_editor= null

  beforeEach ->
    module("YASW")
    inject(($compile, $rootScope) ->
      compile= $compile
      scope= $rootScope.$new()
    )

    # scope.polygon= 
    #   color: "green"
    #   polygon_string: "1,2 1,3 3,1"
    #   score: null
    #   position: [0,0]

    gamepad_editor= compile(angular.element("<gamepad-editor/>"))(scope)
    scope.$digest()

  it "exists", ->
    expect(gamepad_editor[0].nodeName).toEqual('DIV')

  it "has 'no gamepads' displayed", ->
    expect(gamepad_editor[0].text).toEqual("No Gamepads")
