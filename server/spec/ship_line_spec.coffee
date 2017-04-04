ship = require '../../src/ship'
Polygon= require('./../../src/polygon').Polygon;

describe 'a ships lines' , ->
  it 'should have lines', ->
    the_ship = new ship.Ship(
      debug: true,
      0,
      0,
      0,
    )
    the_ship.shape= [new Polygon([[0,0],[1,2],[2,3]])]
    the_ship.update_outline()

    expect(the_ship.lines()).toEqual(
      [
        [[0,0],[1,2]],
        [[1,2],[2,3]],
        [[2,3],[0,0]],
      ]
    )

  it 'should have lines', ->
    the_ship = new ship.Ship(
        position: [11,12],
      0,
      0,
      0,
    )
    the_ship.shape= [new Polygon([[0,0],[1,2],[2,3]])]
    the_ship.update_outline()

    expect(the_ship.lines()).toEqual(
      [
        [[11,12],[12,14]],
        [[12,14],[13,15]],
        [[13,15],[11,12]],
      ]
    )
