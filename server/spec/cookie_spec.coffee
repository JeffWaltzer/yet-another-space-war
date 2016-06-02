request = require 'request'
yasw = require './../../src/yasw_server'
http_mocks = require 'node-mocks-http'
Cookies = require('cookies')
Player = require('../../src/player').Player

inject_random_numbers= require('./inject_random_numbers')

session_cookie_of= (response) -> 
  cookie = response._headers['set-cookie']
  return null if !cookie
  return cookie[0].split(';')[0]


describe 'session management', ->
  server = undefined
  fake_response = undefined
  fake_request = undefined

  beforeEach ->
    server = yasw.createServer()
    fake_response = new http_mocks.createResponse()
    fake_response._headerNames= {}


  describe 'When we do not have a session',  ->
    the_cookie = undefined
    beforeEach ->
      fake_request =  new http_mocks.createRequest({
        url: 'http://example.com/index.html'
        path: '/index.html'
      })
      fake_request.connection= {
        encrypted: false
      }
      inject_random_numbers([1])
      server.on_connect(fake_request, fake_response)
      set_cookie = fake_response._headers['set-cookie']
      the_cookie = set_cookie[0].split(';')[0]

    it 'sets the specified cookie', () ->
      expect(the_cookie).toEqual('yasw_player_id=1')

    it 'creates a session entry for the cookie', () ->
      the_cookie_value= the_cookie.split('=')[1]
      expect(server.game.players[the_cookie_value]).toBeDefined()


  describe 'when we do have a cookie and matching session', ->
    set_cookie = undefined
    beforeEach ->
      fake_request =  new http_mocks.createRequest({
        url: 'http://example.com/index.html'
        path: '/index.html'
        headers:  {'cookie' : 'yasw_player_id=Mike;'}
      })
      fake_request.connection= {
        encrypted: false
      }

      server.game.players['Mike']= new Player()

      server.on_connect(fake_request, fake_response)
      headers= fake_response._headers;
      set_cookie= headers && headers['set-cookie']

    it 'does not set a new cookie', ->
      expect(set_cookie).toBeUndefined()

    it 'keeps existing session', ->
      expect(server.game.players['Mike']).toBeDefined()


  describe 'when we do have several cookies and a matching session for one', ->
    set_cookie = undefined
    beforeEach ->
      fake_request =  new http_mocks.createRequest({
        url: 'http://example.com/index.html'
        path: '/index.html'
        headers:  {'cookie' : 'foo=bar;yasw_player_id=Mike;frobazz=true'}
      })
      fake_request.connection= {
        encrypted: false
      }

      server.game.players['Mike']= new Player()

      server.on_connect(fake_request, fake_response)
      headers= fake_response._headers;
      set_cookie= headers && headers['set-cookie']

    it 'does not set a new cookie', ->
      expect(set_cookie).toBeUndefined()

    it 'keeps existing session', ->
      expect(server.game.players['Mike']).toBeDefined()


  describe 'when we do have a cookie and no matching session', ->
    set_cookie = undefined
    the_cookie = undefined
    beforeEach ->
      fake_request =  new http_mocks.createRequest({
        url: 'http://example.com/index.html'
        path: '/index.html'
        headers:  {'cookie' : 'yasw_player_id=Mike;'}
      })
      fake_request.connection= {
        encrypted: false
      }

      inject_random_numbers([1])
      server.on_connect(fake_request, fake_response)
      headers = fake_response._headers;
      set_cookie = headers && headers['set-cookie']
      the_cookie = set_cookie && set_cookie[0].split(';')[0]

    it 'sets a new cookie', () ->
      expect(the_cookie).toEqual('yasw_player_id=1')

    it 'creates a new session entry for the cookie', () ->
      the_cookie_value= the_cookie && the_cookie.split('=')[1]
      expect(server.game.players[the_cookie_value]).toBeDefined()
