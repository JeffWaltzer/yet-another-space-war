request = require 'request'
yasw = require './../../src/yasw_server'

check_request= (page_name, expected_file, expected_content_type) ->
  describe "the server, when asked for '#{page_name}'" , ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()
      server.listen(3000)

    it "should call the static page function for #{expected_file}", (done) ->
      spyOn(server, 'static_page').andCallFake (filename, response) ->
        expect(filename).toEqual(expected_file);
        done()

      request "http://localhost:3000#{page_name}", (error, response, body) ->
        expect(server.static_page).toHaveBeenCalled 
        done()

    it "should respond with content type #{expected_content_type}", (done) ->
      request "http://localhost:3000#{page_name}", (error, response, body) ->
        expect(error).toBeNull();
        expect(response.headers['content-type']).toEqual(expected_content_type)
        done()

    afterEach ->
      server.shutdown()

check_content= (page_name, expected_content_regexp) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()
      server.listen(3000)

    it "should respond with a page matching", (done) ->
      request 'http://localhost:3000', (error, response, body) ->
        expect(error).toBeNull();
        expect(body).toMatch expected_content_regexp
        done()

    afterEach ->
      server.shutdown()
  

check_request("", "/index.html", "text/html")
check_content("", /Space Wars/)

check_request("/index.html", "/index.html", "text/html")
check_content("/index.html", /Space Wars/)

check_request("/ship.js", "/ship.js", "text/javascript")
