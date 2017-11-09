yasw = require './../../src/yasw_server'
Ship = require('./../../src/ship').Ship
Bullet = require('./../../src/bullet').Bullet
custom_matchers= require('./../helpers/to_aproximately_equal').custom_matchers
Polygon= require('./../../src/polygon').Polygon;

describe 'ship', ->
  the_ship = undefined

  beforeEach ->
    the_ship = new Ship({}, 0, 0, 0)

  it 'is a ship', ->
    expect(the_ship.is_ship()).toEqual(true)

  it 'has the correct mass', ->
    expect(the_ship.mass()).toEqual(1.0)

describe "ship#outline", ->
  server= undefined
  beforeEach ->
    this.addMatchers(custom_matchers)

    server= yasw.createServer()

    ship = server.game.game_field.add_ship({heading: -Math.PI / 2,})
    ship.shape ( [new Polygon([[10, 0]])])
    ship.update_outline();

    ship = server.game.game_field.add_ship({heading: 0,})
    ship.shape ( [new Polygon([[5, 0]])])
    ship.update_outline();

    ship = server.game.game_field.add_ship({heading: Math.PI / 2,})
    ship.shape ( [new Polygon([[3, 0]])])
    ship.update_outline();

  it "updates the ship position for heading -π/2", ->
    expect(server.game.game_field.ships()[0].outline()).toAproximatelyEqual([[0, -10]], 1e-6)

  it "doesn't change the ship position for heading 0", ->
    expect(server.game.game_field.ships()[1].outline()).toAproximatelyEqual([[5, 0]], 1e-6)

  it "doesn't change the ship position for heading π/2", ->
    expect(server.game.game_field.ships()[2].outline()).toAproximatelyEqual([[0, 3]], 1e-6)

  afterEach ->
    server= null

describe "Ship#gun_point", ->
  server= undefined

  beforeEach ->
    this.addMatchers(custom_matchers)
    server= yasw.createServer()
    server.game.game_field.add_ship({position: [0, 0],   heading: 0})
    server.game.game_field.add_ship({position: [0, 0],   heading: Math.PI/2})
    server.game.game_field.add_ship({position: [10, 10], heading: Math.PI})

  it "expect correct gun_point for unrotated ship", ->
    expect(server.game.game_field.ships()[0].gun_point().x()).toEqual(21)
    expect(server.game.game_field.ships()[0].gun_point().y()).toEqual(0)

  it "expect correct gun_point for rotated ship", ->
    expect(server.game.game_field.ships()[1].gun_point().x()).toBeCloseTo(0, 6)
    expect(server.game.game_field.ships()[1].gun_point().y()).toBeCloseTo(21,  6)

  it "expect correct gun_point for rotated and translated ship", ->
    expect(server.game.game_field.ships()[2].gun_point().x()).toBeCloseTo(-11, 6)
    expect(server.game.game_field.ships()[2].gun_point().y()).toBeCloseTo(10, 6)

  afterEach ->
    server= null

describe "Ship#fire", ->
  the_game= {}
  the_ship= undefined
  
  beforeEach ->
    the_server= yasw.createServer()
    the_game= the_server.game
    the_ship= the_game.game_field.add_ship()
    the_ship.fire()

  it "adds a bullet", ->
    expect(the_game.game_field.bullets().length).toEqual(1)

  afterEach ->
    the_game= null
    the_ship= null


describe "Ship#clone", ->
  the_game= {}
  the_ship= undefined
  
  beforeEach ->
    the_server= yasw.createServer()
    the_game= the_server.game
    the_ship= the_game.game_field.add_ship()
    the_ship.clone()

  it "adds a ship", ->
    expect(the_game.game_field.ships().length).toEqual(2)

  afterEach ->
    the_game= null
    the_ship= null
