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
          [ 0, 4]
          [ 2, 2]
          [ 4, 0]
          [ 2,-2]
          [ 0,-4]
          [-2,-2]
          [-4, 0]
          [-2, 2]
        ],
        'orange')])


describe "`sun`#outline", ->
  server= undefined

  beforeEach ->
    this.addMatchers(custom_matchers)

    server= yasw.createServer()

  it "shows the sun", ->
    expect(server.game.game_field.screen_objects()[0].outline()).toAproximatelyEqual([[10, 0]], 1e-6)

  it 'does not explode', ->
    the_sun= server.game.game_field.screen_objects_of_type(Sun)[0]
    the_sun.explode()
    expect(server.game.game_field.screen_objects_of_type(Sun).length).toEqual(1)

  afterEach ->
    server= null
