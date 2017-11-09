yasw = require './../../src/yasw_server'
Sun = require('./../../src/sun').Sun
custom_matchers= require('./../helpers/to_aproximately_equal').custom_matchers
Polygon= require('./../../src/polygon').Polygon;

describe 'sun', ->
  the_sun = undefined

  beforeEach ->
    the_sun = new Sun({})

  it 'is a sun', ->
    expect(the_sun.is_sun()).toEqual(true)

  it 'has a default shape', ->
    expect(the_sun.shape()).toEqual([
      new Polygon(
        [
          [  0, 20]
          [ 14, 14]
          [ 20,  0]
          [ 14,-14]
          [  0,-20]
          [-14,-14]
          [-20,  0]
          [-14, 14]
        ]
        'orange')])

  it "has the correct mass", ->
    expect(the_sun.mass()).toEqual(30000)

describe "`sun`#outline", ->
  server= undefined

  beforeEach ->
    this.addMatchers(custom_matchers)

    server= yasw.createServer()

  it "shows the sun", ->
    expect(server.game.game_field.suns()[0].outline()).toAproximatelyEqual([[10, 0]], 1e-6)

  it 'does not explode', ->
    the_sun= server.game.game_field.suns()[0]
    the_sun.explode()
    expect(server.game.game_field.suns().length).toEqual(1)

  afterEach ->
    server= null
