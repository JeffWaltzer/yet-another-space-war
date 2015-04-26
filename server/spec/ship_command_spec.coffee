yasw = require './../../src/yasw_server'
engine_client = require 'engine.io-client'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  check_rotation = (ship_command, expected_rotation, server, test, init_ship, done) ->
    socket = engine_client('ws://localhost:3000', transports: ['websocket'])
    version = undefined
    socket.on 'open', ->
      socket.on 'error',(e) ->
        console.log("Error: #{e}")
        test.fail("Socket error: #{e}")
        done()
      socket.on 'upgradeError', (e)->
        test.fail("Upgrade error: #{e}")
        done()
      if init_ship
        init_ship();
      socket.send JSON.stringify({'command': ship_command}) , ->
        setTimeout (->
          expect(server.ships[0].rotation).toEqual(expected_rotation)
          done()
        ),50

  it 'starts with no ships', () ->
    expect(server.ships.length).toEqual(0)

  xit 'starts with non-rotating ship', () ->
   expect(something);

  it 'sets ship negative rotation on rotate_left', (done) ->
    check_rotation "rotate_left", -1, server, this, null, done

  it 'sets ship postive rotation on rotate_right', (done) ->
    check_rotation "rotate_right", 1, server, this, null, done

  it 'sets ship no rotation on rotate_stop', (done) ->
    set_rotation = ->
      server.ships[0].rotation = 1
    check_rotation "rotate_stop", 0, server, this, set_rotation, done

  afterEach ->
    server.shutdown()
