request = require 'request'
yasw = require './../../src/yasw_server'

check_request= (page_name, expected_file, expected_content_type) ->
  describe "the server, when asked for '#{page_name}'" , ->
    server= undefined
    beforeEach (done) ->
      server= yasw.createServer()
      server.listen(3000, ->
        done())

    it "should call the static page function for #{expected_file}", (done) ->
      spyOn(server, 'static_page').andCallFake (filename, response) ->
        expect(filename).toEqual(expected_file);
        response.end()

      request "http://localhost:3000#{page_name}", (error, response, body) ->
        expect(server.static_page).toHaveBeenCalled()
        done()

    it "should respond with content type #{expected_content_type}", (done) ->
      request "http://localhost:3000#{page_name}", (error, response, body) ->
        expect(error).toBeNull();
        expect(response.headers['content-type']).toEqual(expected_content_type)
        done()

    afterEach (done) ->
      server.shutdown(-> done())

check_content= (page_name, expected_content_regexp) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()
      server.listen(3000)

    it "should respond with a page matching", (done) ->
      request 'http://localhost:3000' + page_name, (error, response, body) ->
        expect(error).toBeNull();
        expect(body).toMatch expected_content_regexp
        done()

    afterEach ->
      server.shutdown()

check_status= (page_name, expected_status) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()
      server.listen(3000)

    it "should respond with a status of #{expected_status}", (done) ->
      request 'http://localhost:3000' + page_name, (error, response, body) ->
        expect(error).toBeNull();
        expect(response.statusCode).toMatch expected_status
        done()

    afterEach ->
      server.shutdown()


check_header= (page_name, header_name, expected_header_value) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()
      server.listen(3000)

    it "should respond with a status of #{expected_status}", (done) ->
      request 'http://localhost:3000' + page_name, (error, response, body) ->
        expect(error).toBeNull();
        expect(response.headers[header_name]).toEqual expected_header_value
        done()

    afterEach ->
      server.shutdown()


check_request("", "/index.html", "text/html")
check_content("", /Space Wars/)
check_status("", 302);
#check_header("", "location", "/game.html");

check_request("/game.html", "/game.html", "text/html")
check_content("/game.html", /Space Wars/)

check_request("/controllers/ship_command.js", "/controllers/ship_command.js", "text/javascript")
