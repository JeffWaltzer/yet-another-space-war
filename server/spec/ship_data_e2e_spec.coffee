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

    socket.on 'open', ->
      socket.on 'message', (message)->
        expect(message).toEqual('{"0":[[90,90],[100,95],[110,90],[100,121]]}')
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
