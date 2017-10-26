require("./vector_equals")
GameField= require("./../../src/game_field").GameField
Vector= require("./../../src/vector").Vector

the_game_field= null
the_ship= null

describe "gravity", ->
  beforeEach ->
    the_game_field= new GameField
      field_size: new Vector([200, 200])

    the_sun= the_game_field.add_sun({})
    the_sun.position(new Vector([100, 100]))
    the_sun.mass(1)

    the_ship= the_game_field.add_ship(position: [0, 100])
    the_ship.mass(1)

    the_game_field.update_screen_objects(1)

  it "puts the ship in the game field", ->
    expect(the_ship.position()).toEqualVector(new Vector([1/(100*100), 100]))
