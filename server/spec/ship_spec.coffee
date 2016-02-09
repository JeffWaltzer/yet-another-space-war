yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

custom_matchers=
  toAproximatelyEqual: (util, customEqualityTesters) ->
    return {
      compare: (actual, expected) ->
        result= {};
        result.pass= true;
        result.message= '';
        if actual.length != expected.length
          result.pass= false;
          result.message= "arrays are not the same size: expected: #{expected.length}; actual: #{actual.length}";
          return result;

        underscore.each underscore.zip(actual, expected), (point_pair) ->
          expected_value= point_pair[0]
          actual_value= point_pair[1]
          if Math.abs(actual[0] - expected[0]) > 1e-6
            result.pass= false;
          if Math.abs(actual[1] - expected[1]) > 1e-6
            result.pass= false;
        result
      }

describe "ship#outline", ->
  server= undefined
  beforeEach ->
    this.addMatchers(custom_matchers)

    server= yasw.createServer()

    server.game.add_ship({heading: -Math.PI/2, points: [[10, 0]]})
    server.game.add_ship({heading:          0, points: [[5, 0]]})
    server.game.add_ship({heading:  Math.PI/2, points: [[3, 0]]})

  it "updates the ship position for heading -π/2", ->
    expect(server.game.game_field.screen_objects()[0].outline()).toAproximatelyEqual([[0, -10]], 1e-6)

  it "doesn't change the ship position for heading 0", ->
    expect(server.game.game_field.screen_objects()[1].outline()).toAproximatelyEqual([[5, 0]], 1e-6)

  it "doesn't change the ship position for heading π/2", ->
    expect(server.game.game_field.screen_objects()[2].outline()).toAproximatelyEqual([[0, 3]], 1e-6)

  afterEach ->
    server= null

describe "Ship#gun_point", ->
  server= undefined

  beforeEach ->
    this.addMatchers(custom_matchers)
    server= yasw.createServer()
    server.game.add_ship({position: [0, 0], heading: 0,         gun_point: [1, 2]})
    server.game.add_ship({position: [0, 0], heading: Math.PI/2, gun_point: [1, 2]})
    server.game.add_ship({heading: Math.PI,   gun_point: [1, 2], position: [10, 10]})

  it "expect correct gun_point for unrotated ship", ->
    expect(server.game.game_field.screen_objects()[0].gun_point().x()).toEqual(1)
    expect(server.game.game_field.screen_objects()[0].gun_point().y()).toEqual(2)

  it "expect correct gun_point for rotated ship", ->
    expect(server.game.game_field.screen_objects()[1].gun_point().x()).toBeCloseTo(-2, 6)
    expect(server.game.game_field.screen_objects()[1].gun_point().y()).toBeCloseTo(1,  6)

  it "expect correct gun_point for rotated and translated ship", ->
    expect(server.game.game_field.screen_objects()[2].gun_point().x()).toBeCloseTo(9, 6)
    expect(server.game.game_field.screen_objects()[2].gun_point().y()).toBeCloseTo(8, 6)

  afterEach ->
    server= null

describe "Ship#fire", ->
  the_game= {}
  the_ship= undefined
  
  beforeEach ->
    the_server= yasw.createServer()
    the_game= the_server.game
    the_ship= the_game.add_ship()
    the_ship.fire()

  it "adds a bullet", ->
    expect(the_game.game_field.screen_objects().length).toEqual(2)

  afterEach ->
    the_game= null
    the_ship= null


describe "Ship#clone", ->
  the_game= {}
  the_ship= undefined
  
  beforeEach ->
    the_server= yasw.createServer()
    the_game= the_server.game
    the_ship= the_game.add_ship()
    the_ship.clone()

  it "adds a ship", ->
    expect(the_game.game_field.screen_objects().length).toEqual(2)

  afterEach ->
    the_game= null
    the_ship= null
