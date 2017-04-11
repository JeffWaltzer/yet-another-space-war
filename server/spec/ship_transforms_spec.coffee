ship = require './../../src/ship'
game = require './../../src/game'
Polygon= require('./../../src/polygon').Polygon;

describe "A ship not at the origin, but not rotated", ->
  the_ship= null
  beforeEach ->
    the_game = new game.Game({})
    the_ship= the_game.game_field.add_ship({
      rotation: 0,
      heading: 0,
      position: [10,20],
    })
    the_ship.shape( [new Polygon([[1,0]])])
    the_ship.update_outline()

  it 'translates x', ->
    expect(the_ship.outline()[0]._points[0][0]).toBeCloseTo(11)

  it 'translates y', ->
    expect(the_ship.outline()[0]._points[0][1]).toBeCloseTo(20)

  afterEach ->
    the_ship= null

describe "Rotation around the  origin", ->
  the_ship= null
  beforeEach ->
    the_game = new game.Game({})
    the_ship= the_game.game_field.add_ship({
      rotation: 0,
      heading: Math.PI/2,
      position: [0,0],
    })
    the_ship.shape( [new Polygon([[1,0]])])
    the_ship.update_outline()

  it 'rotates x', ->
    expect(the_ship.outline()[0]._points[0][0]).toBeCloseTo(0)

  it 'rotates y', ->
    expect(the_ship.outline()[0]._points[0][1]).toBeCloseTo(1)

  afterEach ->
    the_ship= null

describe "Rotation of 1,0 around itself", ->
  the_ship= null
  beforeEach ->
    the_game = new game.Game({})
    the_ship= the_game.game_field.add_ship({
      rotation: 0,
      heading: Math.PI/2,
      position: [1,0],
    })
    the_ship.shape( [new Polygon([[1,0]])])
    the_ship.update_outline()

  it 'rotates x', ->
    expect(the_ship.outline()[0]._points[0][0]).toBeCloseTo(1)

  it 'rotates y', ->
    expect(the_ship.outline()[0]._points[0][1]).toBeCloseTo(1)

  afterEach ->
    the_ship= null

describe "Rotation of 1,0 around 2,2", ->
  the_ship= null
  beforeEach ->
    the_game = new game.Game({})
    the_ship= the_game.game_field.add_ship({
      rotation: 0,
      heading: -Math.PI/2,
      position: [2,2],
    })
    the_ship.shape( [new Polygon([[1,0]])])
    the_ship.update_outline()

  it 'rotates x', ->
    expect(the_ship.outline()[0]._points[0][0]).toBeCloseTo(2)

  it 'rotates y', ->
    expect(the_ship.outline()[0]._points[0][1]).toBeCloseTo(1)

  afterEach ->
    the_ship= null
