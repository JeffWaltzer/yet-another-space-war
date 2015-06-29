ship = require '../../src/ship'

describe 'a ships lines' , ->
  it 'should ????', ->
    the_ship = new ship.Ship(
      points: [[0,0],[1,2],[2,3]]
    )
    expect(the_ship.lines()).toEqual(
      [
        [[0,0],[1,2]],
        [[1,2],[2,3]],
        [[2,3],[0,0]],
      ]
    )