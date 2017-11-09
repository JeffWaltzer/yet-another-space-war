require("./vector_equals")
GameField= require("./../../src/game_field").GameField
Vector= require("./../../src/vector").Vector

the_game_field= null
the_ship= null
the_sun = null

describe "gravity", ->
  beforeEach ->
    the_game_field= new GameField
      field_size: new Vector([200, 200])
      G: 1

    the_sun= the_game_field.add_sun({})
    the_sun.position(new Vector([100, 100]))
    the_sun.mass(1)

    the_ship= the_game_field.add_ship(position: [0, 100])
    the_ship.mass(1)

  it "affects the ship", ->
    the_game_field.update_screen_objects(1)
    expect(the_ship.position()).toEqualVector(new Vector([1/(100*100), 100]))

  it "gets twice as strong with double the suns mass", ->
    the_sun.mass(2)
    the_game_field.update_screen_objects(1)
    expect(the_ship.position()).toEqualVector(new Vector([2/(100*100), 100]))

  it "stays the same with double the ship mass", ->
    the_ship.mass(2)
    the_game_field.update_screen_objects(1)
    expect(the_ship.position()).toEqualVector(new Vector([1/(100*100), 100]))

  it "has twice the effect with twice the time", ->
    the_game_field.update_screen_objects(1/2)
    expect(the_ship.position()).toEqualVector(new Vector([2/(100*100), 100]))

  it "gets thrice as strong with triple gravitational constant", ->
    the_game_field.G(3)
    the_game_field.update_screen_objects(1)
    expect(the_ship.position()).toEqualVector(new Vector([3/(100*100), 100]))

  it "is four time stronger with half the distance", ->
    the_ship.position(new Vector([50,100]))
    the_game_field.update_screen_objects(1)
    expect(the_ship.position()).toEqualVector(new Vector([50 + 1/(50*50), 100]))
