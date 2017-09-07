yasw = require './../../src/yasw_server'
sun = require './../../src/sun'
custom_matchers= require('./../helpers/to_aproximately_equal').custom_matchers
Polygon= require('./../../src/polygon').Polygon;

describe 'sun', ->
  the_sun = undefined

  beforeEach ->
    the_sun = new sun.Sun({}, 0, 0, 0)

  it 'is a sun', ->
    expect(the_sun.is_sun()).toEqual(true)

describe "`sun`#outline", ->
  server= undefined
  beforeEach ->
    this.addMatchers(custom_matchers)

    server= yasw.createServer()

    sun = server.game.game_field.add_sun({})
    sun.shape ( [new Polygon([[10, 0]])])
    sun.update_outline();


  it "shows the sun", ->
    expect(server.game.game_field.screen_objects()[0].outline()).toAproximatelyEqual([[10, 0]], 1e-6)

  afterEach ->
    server= null
