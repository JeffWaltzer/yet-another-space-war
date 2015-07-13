yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

describe "server initialization", ->
  server= undefined

  beforeEach ->
    spyOn(global, 'setInterval');
    server= yasw.createServer();

  it "arranges for game#tick to be called periodically", ->
    expect(setInterval).toHaveBeenCalledWith(server.game.tick, 1000 / server.tick_rate)

describe "game#tick" , ->
  server= undefined
  heading_change= undefined
  sent_data = undefined
  ships = undefined
  bullet = undefined

  beforeEach ->
    server= yasw.createServer({
      ship_rotation_rate: 2*Math.PI # radians/s
      tick_rate: 10                 # ticks/s
      bullet_life_time: 20
    })
    heading_change= server.ship_rotation_rate/server.tick_rate;
    ships=[]
    ships.push server.game.add_ship({rotation:  0, heading:          0, points: [[5, 0]], position: [10, 10]})
    ships.push server.game.add_ship({rotation:  0, heading:  Math.PI/2, points: [[3, 0]], position: [20, 20]})
    ships.push server.game.add_ship({rotation:  1, heading:          0, points: [[5, 0]], position: [30, 30]})
    ships.push server.game.add_ship({rotation: -1, heading:  Math.PI/2, points: [[3, 0]], position: [105, 100]})
    bullet = ships[0].fire()
    fake_socket=
      send: (data) ->
        sent_data = data
    viewing_ship = server.game.add_ship({rotation:  0, heading:          0, points: [[5, 0]], position:[50,60]})
    viewing_ship.socket = fake_socket;

    server.game.tick()

  it "doesn't change the first ship's heading", ->
    expect(ships[0].heading).toBeCloseTo(0, 6)

  it "doesn't change the second ship's heading", ->
    expect(ships[1].heading).toBeCloseTo(Math.PI/2, 6)

  it "updates the third ship's heading", ->
    expect(ships[2].heading).toBeCloseTo(heading_change, 6)

  it "updates the fourth ship's heading", ->
    expect(ships[3].heading).toBeCloseTo(Math.PI/2 - heading_change, 6)

  it 'shows ships', ->
    outlines=JSON.parse(sent_data)
    expect(Object.keys(outlines).length).toEqual(6)

  it 'updates bullets', ->
    expect(bullet.life_left).toBeCloseTo(20 - 1/server.tick_rate, 6)


  afterEach ->
    server= null
