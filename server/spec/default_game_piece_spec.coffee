ScreenObject= require('../../src/screen_object').ScreenObject
Polygon= require('../../src/polygon').Polygon

describe "the default game piece color", ->
  a_screen_object= new ScreenObject
    shape: [new Polygon()]
    mass: 1
  the_game_piece= a_screen_object.make_game_piece()

  it "is white", ->
    expect(the_game_piece.wireframe[0].color).toEqual('white')
