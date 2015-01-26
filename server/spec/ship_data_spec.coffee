request = require 'request'
yasw = require './../../src/yasw_server'

describe 'the server, when asked for ship data ', ->
  server= undefined
  beforeEach ->
    server= yasw.createServer()
    server.listen(3000)

  it 'should respond with hello world', (done) ->
    request 'http://localhost:3000/ships/0', (error, response, body) ->
      expect(error).toBeNull();
      expect(body).toEqual '[[100, 100], [125, 85], [150, 100], [125, 50]]'
      done()

  it 'should respond with hello world a second time', (done) ->
    request 'http://localhost:3000/ships/0', (error, response, body) ->
      expect(error).toBeNull();
      expect(body).toEqual '[[100, 100], [125, 85], [150, 100], [125, 50]]'
      done()

  afterEach ->
    server.shutdown()
