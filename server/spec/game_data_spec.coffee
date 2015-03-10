request = require 'request'
yasw = require './../../src/yasw_server'

engine_client = require 'engine.io-client'

describe 'the server, when asked for the default page ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  it 'should call the static page function for /index.html', (done) ->
    spyOn(server, 'static_page').andCallFake (filename, response) ->
      expect(filename).toEqual("/index.html");
      done()

    request 'http://localhost:3000', (error, response, body) ->
      expect(server.static_page).toHaveBeenCalled 
      done()

  it 'should respond with a static page', (done) ->
    request 'http://localhost:3000', (error, response, body) ->
      expect(error).toBeNull();
      expect(body).toMatch /Space War/
      done()

  it 'should respond with content type html', (done) ->
    request 'http://localhost:3000', (error, response, body) ->
      expect(error).toBeNull();
      expect(response.headers['content-type']).toEqual('text/html')
      done()

  afterEach ->
    server.shutdown()

describe 'the server, when asked for /index.html ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  it 'should call the static page function for /index.html', (done) ->
    spyOn(server, 'static_page').andCallFake (filename, response) ->
      expect(filename).toEqual("/index.html");
      done()

    request 'http://localhost:3000/index.html', (error, response, body) ->
      expect(server.static_page).toHaveBeenCalled 
      done()

  it 'should respond with content type html', (done) ->
    request 'http://localhost:3000', (error, response, body) ->
      expect(error).toBeNull();
      expect(response.headers['content-type']).toEqual('text/html')
      done()

  afterEach ->
    server.shutdown()

describe 'the server, when asked for /ship.js ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  it 'should call the static page function with /ship.js', (done) ->
    spyOn(server, 'static_page').andCallFake (filename, response) ->
      expect(filename).toEqual("/ship.js");
      done()

    request 'http://localhost:3000/ship.js', (error, response, body) ->
      expect(server.static_page).toHaveBeenCalled 
      done()

  afterEach ->
    server.shutdown()

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

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
