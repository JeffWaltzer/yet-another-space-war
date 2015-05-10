yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

custom_matchers= {
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

        _.each(_.zip(actual, expected), (point_pair) ->
          expected_value= point_pair[0]
          actual_value= point_pair[1]
          if Math.abs(actual[0] - expected[0]) > 1e-6
            result.pass= false;
          if Math.abs(actual[1] - expected[1]) > 1e-6
            result.pass= false;
          )
        result;
      }
    }

describe "ship#outline" , ->
  server= undefined
  beforeEach ->
    this.addMatchers(custom_matchers)

    server= yasw.createServer()

    server.add_ship new ship.Ship({heading: -Math.PI/2, points: [[10, 0]]})
    server.add_ship new ship.Ship({heading:          0, points: [[5, 0]]})
    server.add_ship new ship.Ship({heading:  Math.PI/2, points: [[3, 0]]})

  it "updates the ship position for heading -π/2", ->
    expect(server.ships[0].outline()).toAproximatelyEqual([[0, -10]], 1e-6)

  it "doesn't change the ship position for heading 0", ->
    expect(server.ships[1].outline()).toAproximatelyEqual([[5, 0]], 1e-6)

  it "doesn't change the ship position for heading π/2", ->
    expect(server.ships[2].outline()).toAproximatelyEqual([[0, 3]], 1e-6)

  afterEach ->
    server= null
