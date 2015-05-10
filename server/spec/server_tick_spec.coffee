yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

describe "server initialization", ->
  server= undefined

  beforeEach ->
    spyOn(global, 'setInterval');
    server= yasw.createServer();

  it "arranges for server#tick to be called periodically", ->
    expect(setInterval).toHaveBeenCalledWith(server.tick, 1000 / server.tick_rate)

describe "server#tick" , ->
  server= undefined
  heading_change= undefined

  beforeEach ->
    server= yasw.createServer({
      ship_rotation_rate: 2*Math.PI, # radians/s
      tick_rate: 10,                 # ticks/s
    })
    heading_change= server.ship_rotation_rate/server.tick_rate;
    server.add_ship new ship.Ship({rotation:  0, heading:          0, points: [[5, 0]]})
    server.add_ship new ship.Ship({rotation:  0, heading:  Math.PI/2, points: [[3, 0]]})
    server.add_ship new ship.Ship({rotation:  1, heading:          0, points: [[5, 0]]})
    server.add_ship new ship.Ship({rotation: -1, heading:  Math.PI/2, points: [[3, 0]]})
    server.tick()

  it "doesn't change the first ship's heading", ->
    expect(server.ships[0].heading).toBeCloseTo(0, 6)

  it "doesn't change the second ship's heading", ->
    expect(server.ships[1].heading).toBeCloseTo(Math.PI/2, 6)

  it "updates the third ship's heading", ->
    expect(server.ships[2].heading).toBeCloseTo(heading_change, 6)

  it "updates the fourth ship's heading", ->
    expect(server.ships[3].heading).toBeCloseTo(Math.PI/2 - heading_change, 6)

  afterEach ->
    server= null
