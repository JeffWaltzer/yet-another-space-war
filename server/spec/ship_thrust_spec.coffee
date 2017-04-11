ship = require '../../src/ship'
Polygon= require('./../../src/polygon').Polygon;

# Test is wrong.
describe 'a non thrust ships shape', ->
  it 'should have polygon', ->
    the_ship = new ship.Ship({
    })
    the_ship.acceleration = 0;
    expect(the_ship.shape()).toEqual([new Polygon([[-10, 10], [20, 0], [-10, -10], [0, 0]])])

describe 'a thrust ships shape', ->
  it 'should have polygon', ->
    the_ship = new ship.Ship({
    })
    the_ship.acceleration = 5;
    expect(the_ship.shape()).toEqual([
      new Polygon([[-10, 10], [20, 0], [-10, -10], [0, 0]]),
      new Polygon([[-5, 0], [-10, 5], [-20, 0], [-10, -5]], 'red')
    ])

