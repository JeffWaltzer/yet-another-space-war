math_util= require '../../src/math_util'

describe 'two parallel lines', ->
  it 'do not intersect', ->
    a_horizontal_line= [[0, 1], [10, 1]];
    another_horizontal_line= [[5, 3], [25, 3]]
    expect(math_util.intersect(a_horizontal_line, another_horizontal_line)).toBeFalsy()
