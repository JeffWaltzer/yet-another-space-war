yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

describe "ship#outline" , ->
  server= null
  on_callbacks = {}
  fake_socket = null
  the_ship= null

  beforeEach ->
    fake_socket =
      send: ->
      on: (event, callback) ->
        on_callbacks[event] = callback

    server= yasw.createServer()
    the_ship= server.on_new_websocket(fake_socket)
    on_callbacks['message'](JSON.stringify({command: 'rotate_left'}));

  it 'rotates the correct ship', ->
    expect(the_ship.angular_velocity()).toEqual(-ship.Ship.rotation_rate)

  afterEach ->
    server= null
