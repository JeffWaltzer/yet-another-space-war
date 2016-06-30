yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

describe "ship#outline" , ->
  server= null
  on_message_callback = null
  fake_socket = null
  ship= null

  beforeEach ->
    fake_socket =
      send: ->
      on: (message, callback) ->
        on_message_callback = callback
      request: {headers: {cookie: "yasw_player_id=1"}}

    server= yasw.createServer()
    server.game.add_player('1');

    server.game.add_ship({heading: -Math.PI/2, points: [[10, 0]]})
    server.game.add_ship({heading:          0, points: [[5, 0]]})
    server.game.add_ship({heading:  Math.PI/2, points: [[3, 0]]})
    ship= server.on_new_websocket(fake_socket)
    on_message_callback(JSON.stringify({command: 'rotate_left'}));

  it 'rotates the correct ship', ->
    expect(ship.angular_velocity).toEqual(-server.game.ship_rotation_rate)

  afterEach ->
    server= null
