underscore = require('underscore')
yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

describe "server initialization", ->
  server= undefined

  beforeEach ->
    spyOn(global, 'setInterval');
    server= yasw.createServer();

  it "arranges for game#tick to be called periodically", ->
    expect(setInterval.mostRecentCall.args[1]).toEqual(1000 / server.tick_rate)

describe "game#tick" , ->
  server= undefined
  heading_change= undefined
  sent_data = undefined
  ships = undefined
  bullet = undefined
  dead_bullet = undefined

  beforeEach ->
    server= yasw.createServer({
      ship_rotation_rate: 2*Math.PI # radians/s
      tick_rate: 10                 # ticks/s
      bullet_lifetime: 20
    })
    heading_change= ship.Ship.rotation_rate/server.tick_rate;
    ships=[]
    ships.push server.game.game_field.add_ship({angular_velocity:  0,                         heading:          0, points: [[5, 0]], position: [10, 10]}, 0, 0, server.game.bullet_lifetime)
    ships.push server.game.game_field.add_ship({angular_velocity:  0,                         heading:  Math.PI/2, points: [[3, 0]], position: [20, 20]}, 0, 0, server.game.bullet_lifetime)
    ships.push server.game.game_field.add_ship({angular_velocity:  ship.Ship.rotation_rate, heading:          0, points: [[5, 0]], position: [30, 30]}, 0, 0, server.game.bullet_lifetime)
    ships.push server.game.game_field.add_ship({angular_velocity: -ship.Ship.rotation_rate, heading:  Math.PI/2, points: [[3, 0]], position: [105, 100]}, 0, 0, server.game.bullet_lifetime)

    bullet = ships[0].fire()

    dead_bullet= ships[1].fire()
    dead_bullet.life_left = 0

    fake_socket=
      send: (data) ->
        sent_data = data

    player= server.game.add_player('player_id');
    player.socket= fake_socket;

    viewing_ship = server.game.game_field.add_ship({angular_velocity:  0, heading:          0, points: [[5, 0]], position:[50,60]}, 0, 0, server.game.bullet_lifetime)
    player.ship= viewing_ship;

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
    message= JSON.parse(sent_data)
    outlines= message.screen_objects

    expect(Object.keys(outlines).length).toEqual(6)

  it 'updates bullets', ->
    expect(bullet.life_left).toBeCloseTo(20 - 1/server.tick_rate, 6)

  it 'has no dead bullets', ->
    expect(server.game.game_field.screen_objects()).not.toContain(dead_bullet)

  afterEach ->
    server= null
