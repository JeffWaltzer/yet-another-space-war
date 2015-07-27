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
      socket.on 'message', (json_message)->
        message= JSON.parse(json_message)
        expect(Object.keys(message)).toEqual(['you', 'screen_objects'])
        expect(message.screen_objects['0'].length).toEqual(4)
        expect(message.you).toEqual('0')
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
