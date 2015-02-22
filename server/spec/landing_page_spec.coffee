request = require 'request'
yasw = require './../../src/yasw_server'
fs= require 'fs'
http_mocks= require 'node-mocks-http'

describe 'yasw_server#static_page ', ->
  server= undefined
  page= undefined
  beforeEach ->
    server= yasw.createServer()

  it 'should load the specified file', (done) ->
    spyOn(fs, 'createReadStream').andCallThrough();
    fake_response= new http_mocks.createResponse
    page= server.static_page("/index.html", fake_response)
    expect(fs.createReadStream).toHaveBeenCalledWith("html/index.html")
    done()
