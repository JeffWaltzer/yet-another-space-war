underscore = require('underscore')
yasw = require './../../src/yasw_server'
Ship = require('./../../src/ship').Ship
Fragment = require( './../../src/fragment').Fragment
Polygon= require('./../../src/polygon').Polygon

describe 'game tick', ->
  game_field = undefined
  beforeEach ->
    server= yasw.createServer({
      ship_rotation_rate: 2*Math.PI # radians/s
      tick_rate: 10                 # ticks/s
      fragment_lifetime: 20
    })
    game = server.game
    game_field = game.game_field
    game_field.add_screen_object(new Fragment({game_field: game_field, shape: [new Polygon([[0,0],[0,5],[5,5],[5,0]])]}))
    game_field.add_screen_object(new Fragment({game_field: game_field, shape: [new Polygon([[2,2],[2,7],[7,7],[7,2]])]}))
    game.tick()

  it 'does not collide', ->
    expect(game_field.fragments().length).toEqual(2)

describe "game#tick" , ->
  server= undefined
  heading_change= undefined
  sent_data = undefined
  ships = undefined
  fragment = undefined
  dead_fragment = undefined
  original_fragment_life_left= undefined 

  beforeEach ->
    server= yasw.createServer({
      ship_rotation_rate: 2*Math.PI # radians/s
      tick_rate: 10                 # ticks/s
      fragment_lifetime: 20
    })
    heading_change= Ship.rotation_rate/server.tick_rate;
    ships=[]
    ships.push server.game.game_field.add_ship({rotation:  0, heading:          0, points: [[5, 0]], position: [10, 10]})
    ships.push server.game.game_field.add_ship({rotation:  0, heading:  Math.PI/2, points: [[3, 0]], position: [20, 20]})

    fragment = ships[0].explode()[0]
    dead_fragment= ships[1].explode()[0]
    dead_fragment.life_left = 0

    fake_socket=
      send: (data) ->
        sent_data = data

    original_fragment_life_left= fragment.life_left
    server.game.tick()

  it 'updates fragments', ->
    expect(fragment.life_left).toBeCloseTo(original_fragment_life_left - 1/server.tick_rate, 6)

  it 'does not kill the live fragment', ->
    expect(server.game.game_field.screen_objects()).toContain(fragment)

  it 'has no dead fragments', ->
    expect(server.game.game_field.screen_objects()).not.toContain(dead_fragment)

  afterEach ->
    server= null
