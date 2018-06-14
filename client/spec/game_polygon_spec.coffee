describe "the game display", ->
  scope= null
  compile= null
  game_display= null

  beforeEach ->
    module("YASW")
    inject(($compile, $rootScope) ->
      compile= $compile
      scope= $rootScope.$new()
    )

    scope.polygon= 
      color: "some color"
      polygon_string: "a polygon string"
      score: null
      position: [0,0]

    game_display= compile(angular.element("<game-polygon/>"))(scope)
    scope.$digest()


  # Continue Here
  it "has the right color", ->
    expect(game_display.find('polygon')[0].attributes.getNamedItem('stroke').value).toEqual("some color")
