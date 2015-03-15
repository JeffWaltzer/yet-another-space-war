yasw = require './../../src/yasw_server'
engine_client = require 'engine.io-client'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  it 'should respond with ship data', (done) ->
    self = this
    socket = engine_client('ws://localhost:3000', {transports: ['websocket']})
    message = undefined
    socket.on 'open', ->
      socket.on 'message', (data)->
        message = data
        expect(message).toEqual('[[10,10],[15,10],[10,15]]')
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
