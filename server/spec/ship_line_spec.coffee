ship = require '../../src/ship'

describe 'a ships lines' , ->
  it 'should have lines', ->
    the_ship = new ship.Ship(
        points: [[0,0],[1,2],[2,3]]
      0,
      0,
      0,
    )
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
        points: [[0,0],[1,2],[2,3]],
      0,
      0,
      0,
    )
    expect(the_ship.lines()).toEqual(
      [
        [[11,12],[12,14]],
        [[12,14],[13,15]],
        [[13,15],[11,12]],
      ]
    )
