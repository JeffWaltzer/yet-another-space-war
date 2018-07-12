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
      color: "green"
      polygon_string: "1,2 1,3 3,1"
      score: null
      position: [0,0]

    game_display= compile(angular.element("<game-polygon/>"))(scope)
    scope.$digest()


  it "has the right color", ->
    expect(game_display.find('polygon')[0].attributes.getNamedItem('stroke').value).toEqual("green")

  it "has the right polygon string", ->
    expect(game_display.find('polygon')[0].attributes.getNamedItem('points').value).toEqual("1,2 1,3 3,1")
