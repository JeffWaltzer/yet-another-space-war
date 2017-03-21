ship = require '../../src/ship'
Polygon= require('./../../src/polygon').Polygon;

# Test is wrong.
describe 'a ships lines' , ->
  it 'should have lines', ->
    the_ship = new ship.Ship({
      shape: new Polygon([[-10, 10], [20, 0], [-10, -10], [0, 0]]),
    })
    expect(the_ship.shape).toEqual(new Polygon([[-10, 10], [20, 0], [-10, -10], [0, 0]]))

