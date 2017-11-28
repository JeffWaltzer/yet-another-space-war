yasw = require './../../src/yasw_server'
Sun = require('./../../src/sun').Sun
custom_matchers = require('./../helpers/to_aproximately_equal').custom_matchers
Polygon = require('./../../src/polygon').Polygon;

describe 'sun', ->
  the_sun = undefined
  shape1 = undefined
  shape2 = undefined

  beforeEach ->
    shape1 = [new Polygon(
      [
        [0, 20],
        [20, 0],
      ],
      'orange'
    )
    ]
    shape2 = [new Polygon(
      [
        [20, 0],
        [0, 20],
      ],
      'blue'
    )
    ]
    the_sun = new Sun({shapes: [shape1, shape2], animation_rate: 0.5})

  it 'starts with first shape', ->
    expect(the_sun.shape()).toEqual(shape1)

  describe 'before one animation-time has passed', ->
     beforeEach ->
       the_sun.update(1)

     it 'still shows the first shape', ->
       expect(the_sun.shape()).toEqual(shape1)

  describe 'after one animation-time has passed', ->
     beforeEach ->
       the_sun.update(0.5)

     it 'shows the second shape', ->
       expect(the_sun.shape()).toEqual(shape2)
