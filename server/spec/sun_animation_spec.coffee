yasw = require './../../src/yasw_server'
Sun = require('./../../src/sun').Sun
custom_matchers = require('./../helpers/to_aproximately_equal').custom_matchers
Polygon = require('./../../src/polygon').Polygon;

describe 'sun', ->
  the_sun = undefined
  shape1 = undefined

  beforeEach ->
    shape1 = [new Polygon(
      [
        [0, 20],
        [20, 0],
      ],
      'orange'
    )
    ]
    the_sun = new Sun({shapes: [shape1]})

  it 'starts with first shape', ->
    expect(the_sun).toBeDefined()
    expect(the_sun.shape()).toEqual(shape1)
