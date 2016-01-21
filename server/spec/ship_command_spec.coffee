yasw = require './../../src/yasw_server'
engine_client = require 'engine.io-client'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.game.add_player('0.5328')
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
    spyOn(server, 'socket_cookies').andReturn("yasw_player_id=0.5328")
    socket = engine_client('ws://localhost:3000', transports: ['websocket'])
    socket.on 'open', ->
      setup_ship(socket, init_ship, test, done)
      socket.send JSON.stringify({'command': ship_command}) , ->
        setTimeout (->
          expect(server.game.game_field.screen_objects()[0].rotation).toEqual(expected_rotation)
          done()
        ),50

  check_acceleration = (ship_command, expected_acceleration, server, test, init_ship, done) ->
    spyOn(server, 'socket_cookies').andReturn("yasw_player_id=0.5328")
    socket = engine_client('ws://localhost:3000', transports: ['websocket'])
    socket.on 'open', ->
      setup_ship(socket, init_ship, test, done)
      socket.send JSON.stringify({'command': ship_command}) , ->
        setTimeout (->
          expect(server.game.game_field.screen_objects()[0].acceleration).toEqual(expected_acceleration)
          done()
        ),50

  check_fire = (ship_command,  server, test, init_ship, done) ->
    spyOn(server, 'socket_cookies').andReturn("yasw_player_id=0.5328")
    socket = engine_client('ws://localhost:3000', transports: ['websocket'])
    socket.on 'open', ->
      setup_ship(socket, init_ship, test, done)
      spyOn(server.game.game_field.screen_objects()[0],'fire')
      socket.send JSON.stringify({'command': ship_command}) , ->
        setTimeout (->
          expect(server.game.game_field.screen_objects()[0].fire).toHaveBeenCalled()
          done()
        ),50

  check_clone = (server, test, done) ->
    spyOn(server, 'socket_cookies').andReturn("yasw_player_id=0.5328")
    socket = engine_client('ws://localhost:3000', transports: ['websocket'])
    socket.on 'open', ->
      setup_ship(socket, null, test, done)
      socket.send JSON.stringify({'command': 'clone'}) , ->
        setTimeout (->
          expect(server.game.game_field.screen_objects().length).toEqual(2)
          done()
        ),50

  it 'starts with no ships', () ->
    expect(server.game.game_field.screen_objects().length).toEqual(0)

  it 'sets ship negative rotation on rotate_left', (done) ->
    check_rotation "rotate_left", -1, server, this, null, done

  it 'sets ship postive rotation on rotate_right', (done) ->
    check_rotation "rotate_right", 1, server, this, null, done

  it 'sets ship no rotation on rotate_stop', (done) ->
    set_rotation = ->
      server.game.game_field.screen_objects()[0].rotation = 1
    check_rotation "rotate_stop", 0, server, this, set_rotation, done

  it 'sets acceleration on thrust_on', (done) ->
    check_acceleration "thrust_on", 1, server, this, null, done

  it 'sets no acceleration on thrust_off', (done) ->
    set_acceleration= ->
      server.game.game_field.screen_objects()[0].acceleration= 1
    check_acceleration "thrust_off", 0, server, this, set_acceleration, done

  it 'fires a bullet on command', (done) ->
    check_fire('fire',server,this,null, done)

  it 'clones the ship on command', (done) ->
    check_clone(server, this, done)

  afterEach ->
    server.shutdown()
