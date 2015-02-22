request = require 'request'
yasw = require './../../src/yasw_server'

engine_client = require 'engine.io-client'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  it 'should call the landing page function', (done) ->
    spyOn(server, 'landing_page').andCallThrough();
    request 'http://localhost:3000', (error, response, body) ->
      expect(server.landing_page).toHaveBeenCalled()
      done()

  it 'should respond with a landing page', (done) ->
    request 'http://localhost:3000', (error, response, body) ->
      expect(error).toBeNull();
      expect(body).toMatch /Space War/
      done()

  it 'should respond with content type html', (done) ->
    request 'http://localhost:3000', (error, response, body) ->
      expect(error).toBeNull();
      expect(response.headers['content-type']).toEqual('text/html')
      done()

  it 'should respond with ship data', (done) ->
    self = this
    socket = engine_client('ws://localhost:3000')
    message = undefined
    socket.on 'message', (data)->
      message = data
      expect(message).toEqual('[[10,10],[15,10],[10,15]]')
      done()
    socket.on 'error',(e) ->
      self.fail(e)
      done()
    socket.on 'upgradeError', (e)->
      self.fail("upgradeError is #{e}")
      done()

  afterEach ->
    server.shutdown()
