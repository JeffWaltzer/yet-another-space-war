yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

describe "server initialization", ->
  server= undefined

  beforeEach ->
    server= yasw.createServer()

  it "sets the ship_rotation_rate", ->
    expect(ship.Ship.rotation_rate).toEqual(Math.PI)

  it "sets the tick_rate", ->
    expect(server.tick_rate).toEqual(1)

  it "sets the acceleration_rate", ->
    expect(ship.Ship.acceleration_rate).toEqual(1)

  it "sets the top_edge", ->
    expect(server.field_size.y()).toEqual(600)

  it "sets the right_edge", ->
    expect(server.field_size.x()).toEqual(800)

  it "sets the bullet_speed", ->
    expect(ship.Ship.bullet_speed).toEqual(10)

  it "sets bullet life time", ->
    expect(ship.Ship.bullet_lifetime).toEqual(4)

   afterEach ->
    server= undefined
