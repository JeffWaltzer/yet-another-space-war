yasw = require './../../src/yasw_server'


describe "server#tick" , ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.add_ship {rotation:  0, heading:          0, points: [[5, 0]]}
    server.add_ship {rotation:  0, heading:  Math.PI/2, points: [[3, 0]]}
    server.add_ship {rotation:  1, heading:          0, points: [[5, 0]]}
    server.add_ship {rotation: -1, heading:  Math.PI/2, points: [[3, 0]]}
    server.ship_rotation_rate= 2*Math.PI # radians/s
    server.tick_rate= 10                 # ticks/s
    server.tick()

  it "doesn't change the first ship's heading", ->
    expect(server.ships[0].heading).toBeCloseTo(0, 6)

  it "doesn't change the second ship's heading", ->
    expect(server.ships[1].heading).toBeCloseTo(Math.PI/2, 6)

  it "updates the third ship's heading", ->
    expect(server.ships[2].heading).toBeCloseTo(server.ship_rotation_rate/server.tick_rate, 6)

  it "updates the fourth ship's heading", ->
    expect(server.ships[3].heading).toBeCloseTo(Math.PI/2 - server.ship_rotation_rate/server.tick_rate, 6)

  afterEach ->
    server= null
