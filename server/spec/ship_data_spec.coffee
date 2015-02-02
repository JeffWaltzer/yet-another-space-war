request = require 'request'
yasw = require './../../src/yasw_server'

engine_client = require 'engine.io-client'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  it 'should respond with ship data', (done) ->
    socket = engine_client('ws://localhost:3000')
    message = undefined
    socket.on 'open', ->
      console.log "open!"
    socket.on 'message', (data)->
      message = data
      console.log "message is:" ,data
      expect(message).toEqual('[[10,10],[15,10],[10,15]]')
      done()
    socket.on 'error', ->
      console.log "error is:"
      done()
    socket.on 'upgradeError', ->
      console.log "upgradeError is:"
      done()
    socket.on 'upgrade', ->
      console.log "upgrade is:"
    socket.on 'close', ->
      console.log "closed!!!"
      done()


  afterEach ->
    server.shutdown()
