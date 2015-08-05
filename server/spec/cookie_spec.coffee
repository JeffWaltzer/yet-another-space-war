request = require 'request'
yasw = require './../../src/yasw_server'
http_mocks = require 'node-mocks-http'
Cookies = require('cookies')

describe 'session management', ->
  server = undefined

  beforeEach ->
    server = yasw.createServer()

  it 'should set the specified cookie', () ->
    fake_response = new http_mocks.createResponse()
    fake_request =  new http_mocks.createRequest({
      url: 'http://example.com/index.html'
      path: '/index.html'
    })

    fake_request.connection= {
      encrypted: false
    }

    server.on_connect(fake_request, fake_response)
    set_cookie = fake_response._headers['set-cookie']
    the_cookie = set_cookie[0].split(';')[0]
    expect(the_cookie).toEqual('yasw_game_id=1')

  it 'should create a session entry for the cookie', () ->
    fake_response = new http_mocks.createResponse()
    fake_request =  new http_mocks.createRequest({
      url: 'http://example.com/index.html'
      path: '/index.html'
    })
    fake_request.connection= {
      encrypted: false
    }
    server.on_connect(fake_request, fake_response)
    set_cookie = fake_response._headers['set-cookie']
    the_cookie = set_cookie[0].split(';')[0]
    the_cookie_value= the_cookie.split('=')[1]
    expect(server.sessions[the_cookie_value]).toBeDefined()
