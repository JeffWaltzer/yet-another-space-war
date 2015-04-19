yasw = require './../../src/yasw_server'
engine_client = require 'engine.io-client'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.add_ship(
      rotation: 0,
      points: [[30,30], [20,30],[30,40]],
    )
    server.listen(3000)

  check_rotation = (ship_command, expected_rotation, server, test, done) ->
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
      socket.send ship_command , ->
        setTimeout (->
          expect(server.ships[0].rotation).toEqual(expected_rotation)
          done()
        ),50

  it 'starts ships not rotating', () ->
    expect(server.ships[0].rotation).toEqual(0)

  it 'sets ship negative rotation on rotate_left', (done) ->
    check_rotation "rotate_left", -1, server, this, done

  it 'sets ship postive rotation on rotate_right', (done) ->
    check_rotation "rotate_right", 1, server, this, done

  it 'sets ship no rotation on rotate_stop', (done) ->
    server.ships[0].rotation = 1
    check_rotation "rotate_stop", 0, server, this, done

  afterEach ->
    server.shutdown()
