request = require 'request'
yasw = require './../../src/yasw_server'
fs= require 'fs'
http_mocks= require 'node-mocks-http'

describe 'yasw_server#static_page ', ->
  server= undefined
  page= undefined
  beforeEach ->
    server= yasw.createServer()

  it 'should load the specified file if it exists', (done) ->
    read_stream= undefined
    saved_createReadStream= fs.createReadStream
    fake_response= new http_mocks.createResponse

    spyOn(fs, 'createReadStream').andCallFake (filename) ->
      read_stream= saved_createReadStream(filename)
      read_stream.on 'end', ->
        expect(fake_response.statusCode).toEqual(200)
        done()
      read_stream

    page= server.static_page("/index.html", fake_response)
    expect(fs.createReadStream).toHaveBeenCalledWith("public/index.html")

  it "should set the return status to 404 if the file doesn't exist", (done) ->
    fake_response= new http_mocks.createResponse
    saved_response_end= fake_response.end
    spyOn(fs, 'createReadStream').andCallThrough()
    spyOn(fake_response, 'end').andCallFake ->
      return_value= saved_response_end()
      expect(fake_response.statusCode).toEqual(404)
      done()
      return_value

    page= server.static_page("/missing_file", fake_response)
    expect(fs.createReadStream).toHaveBeenCalledWith("public/missing_file")
