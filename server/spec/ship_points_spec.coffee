ship = require './../../src/ship'

describe "Rotation around the  origin", ->
  the_ship= null
  beforeEach ->
    the_ship= new ship.Ship({
      rotation: 0,
      points: [[1,0]],
      heading: Math.PI/2,
      location: [0,0],
    })

  it 'rotates x', ->
    expect(the_ship.outline()[0][0]).toBeCloseTo(0)

  it 'rotates y', ->
    expect(the_ship.outline()[0][1]).toBeCloseTo(1)

  afterEach ->
    the_ship= null

describe "Ship rotation around 1,0", ->
  the_ship= null
  beforeEach ->
    the_ship= new ship.Ship({
      rotation: 0,
      points: [[1,0]],
      heading: Math.PI/2,
      location: [1,0],
    })

  it 'rotates x', ->
    expect(the_ship.outline(true)[0][0]).toBeCloseTo(1)

  it 'rotates y', ->
    expect(the_ship.outline()[0][1]).toBeCloseTo(0)

  afterEach ->
    the_ship= null