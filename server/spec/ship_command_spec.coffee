yasw = require './../../src/yasw_server'
engine_client = require 'engine.io-client'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  setup_ship = (socket, init_ship, test, done) ->
    socket.on 'error', (e) ->
      console.log("Error: #{e}")
      test.fail("Socket error: #{e}")
      done()
    socket.on 'upgradeError', (e)->
      test.fail("Upgrade error: #{e}")
      done()
    if init_ship
      init_ship();

  check_rotation = (ship_command, expected_rotation, server, test, init_ship, done) ->
    socket = engine_client('ws://localhost:3000', transports: ['websocket'])
    socket.on 'open', ->
      setup_ship(socket, init_ship, test, done)
      socket.send JSON.stringify({'command': ship_command}) , ->
        setTimeout (->
          expect(server.ships[0].rotation).toEqual(expected_rotation)
          done()
        ),50

  check_acceleration = (ship_command, expected_acceleration, server, test, init_ship, done) ->
    socket = engine_client('ws://localhost:3000', transports: ['websocket'])
    socket.on 'open', ->
      setup_ship(socket, init_ship, test, done)
      socket.send JSON.stringify({'command': ship_command}) , ->
        setTimeout (->
          expect(server.ships[0].acceleration).toEqual(expected_acceleration)
          done()
        ),50

  it 'starts with no ships', () ->
    expect(server.ships.length).toEqual(0)

  it 'sets ship negative rotation on rotate_left', (done) ->
    check_rotation "rotate_left", -1, server, this, null, done

  it 'sets ship postive rotation on rotate_right', (done) ->
    check_rotation "rotate_right", 1, server, this, null, done

  it 'sets ship no rotation on rotate_stop', (done) ->
    set_rotation = ->
      server.ships[0].rotation = 1
    check_rotation "rotate_stop", 0, server, this, set_rotation, done

  it 'sets acceleration on thrust_on', (done) ->
    check_acceleration "thrust_on", 1, server, this, null, done

  it 'sets no acceleration on thrust_off', (done) ->
    set_acceleration= ->
      server.ships[0].acceleration= 1
    check_acceleration "thrust_off", 0, server, this, set_acceleration, done

  afterEach ->
    server.shutdown()
