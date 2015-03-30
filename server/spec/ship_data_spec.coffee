yasw = require './../../src/yasw_server'
engine_client = require 'engine.io-client'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  it 'should respond with ship data', (done) ->
    self = this
    socket = engine_client('ws://localhost:3000', transports: ['websocket'])
    version = undefined
    socket.on 'open', ->
      socket.on 'message', (data)->
        if !version
          version = data
          expect(version).toEqual('0')
        else
          message = data
          expect(message).toEqual('{0: [[30,30], [20,30],[30,40] }')
          done()
      socket.on 'error',(e) ->
        console.log("Error: #{e}")
        self.fail("Socket error: #{e}")
        done()
      socket.on 'upgradeError', (e)->
        self.fail("Upgrade error: #{e}")
        done()

  afterEach ->
    server.shutdown()
