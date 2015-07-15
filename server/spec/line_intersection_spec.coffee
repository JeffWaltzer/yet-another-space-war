game= require '../../src/game'

describe 'two parallel lines', ->
  it 'do not intersect', ->
    a_horizontal_line= [[0, 1], [10, 1]];
    another_horizontal_line= [[5, 3], [25, 3]]
    expect(game.intersect(a_horizontal_line, another_horizontal_line)).toBeFalsy()
