request = require 'request'
yasw = require './../../src/yasw_server'
fs= require 'fs'
http_mocks= require 'node-mocks-http'

describe 'yasw_server#landing_page ', ->
  server= undefined
  landing_page= undefined
  beforeEach ->
    server= yasw.createServer()


  it 'should  load the index.html file', (done) ->
    spyOn(fs, 'createReadStream').andCallThrough();
    fake_response= new http_mocks.createResponse
    landing_page= server.landing_page(fake_response)
    expect(fs.createReadStream).toHaveBeenCalled()
    done()

  # it 'should respond with a landing page', (done) ->
  #   request 'http://localhost:3000', (error, response, body) ->
  #     expect(error).toBeNull();
  #     expect(body).toMatch /Space War/
  #     done()

  # it 'should respond with content type html', (done) ->
  #   request 'http://localhost:3000', (error, response, body) ->
  #     expect(error).toBeNull();
  #     expect(response.headers['content-type']).toEqual('text/html')
  #     done()

  # it 'should respond with ship data', (done) ->
  #   self = this
  #   socket = engine_client('ws://localhost:3000')
  #   message = undefined
  #   socket.on 'message', (data)->
  #     message = data
  #     expect(message).toEqual('[[10,10],[15,10],[10,15]]')
  #     done()
  #   socket.on 'error',(e) ->
  #     self.fail(e)
  #     done()
  #   socket.on 'upgradeError', (e)->
  #     self.fail("upgradeError is #{e}")
  #     done()
