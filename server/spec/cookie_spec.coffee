request = require 'request'
yasw = require './../../src/yasw_server'
http_mocks = require 'node-mocks-http'
Cookies = require('cookies')

describe 'session management', ->
  server = undefined
  page = undefined

  beforeEach ->
    server = yasw.createServer()

  it 'should load the specified file if it exists', () ->
    fake_response = new http_mocks.createResponse()
    fake_request =  new http_mocks.createRequest({
      url: 'http://example.com/index.html'
      path: '/index.html'
    })

    fake_request.connection= {
      encrypted: false
    }

    page = server.on_connect(fake_request, fake_response)

    console.log("fake_response._headers %j", fake_response._headers)

    set_cookie = fake_response._headers['set-cookie']

    the_cookie = set_cookie[0].split(';')[0]

    expect(the_cookie).toEqual('yasw_game_id=1')

#    cookies = new Cookies(fake_request, fake_response)
#
#    console.log("cookies: %j", cookies);
#
#    expect(cookies.get('yasw_game_id')).toEqual('1')


#    expect(fs.createReadStream).toHaveBeenCalledWith("public/index.html")

