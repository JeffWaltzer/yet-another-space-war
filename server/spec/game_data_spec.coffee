request = require 'request'
yasw = require './../../src/yasw_server'

check_request= (page_name, expected_file, expected_content_type) ->
  describe "the server, when asked for '#{page_name}'" , ->
    server= undefined
    beforeEach (done) ->
      server= yasw.createServer()
      server.listen(3000, done)

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
      server.shutdown(done)

check_content= (page_name, expected_content_regexp) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()

    it "should respond with a page matching", (done) ->
      got_body= []
      fake_request= {
        url: "http://www.example.com"
        once: ->
        connection: {encrypted: false},
        headers: {},
      }
      fake_response= {
        setHeader: ->
        getHeader: ->
        on: ->
        once: ->
        emit: ->
        write: (data) -> got_body.push(data)
        end: (data) ->
          if (data)
            got_body.push(data)
          got_body= Buffer.concat(got_body)
          expect(got_body.toString()).toMatch(expected_content_regexp)
          done()
      }

      server.on_request(fake_request, fake_response)

check_status= (page_name, expected_status) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined
    beforeEach ->
      server= yasw.createServer()

    it "should respond with a status of #{expected_status}", (done) ->
      fake_request= {
        url: "http://www.example.com/#{page_name}"
        once: ->
        connection: {encrypted: false},
        headers: {}
      }
      fake_response= {
        setHeader: ->
        getHeader: ->
        on: ->
        once: ->
        emit: ->
        write: ->
        end: ->
      }

      server.on_request(fake_request, fake_response, ->
        expect(fake_response.statusCode).toMatch expected_status
        done())


check_header= (page_name, header_name, expected_header_value) ->
  describe "the server, when asked for '#{page_name}'", ->
    server= undefined

    beforeEach ->
      server= yasw.createServer()
      spyOn(server, 'make_session_id').andReturn('foo');

    it "should respond with the '#{header_name}' header set to '#{expected_header_value}'", (done) ->
      fake_request= {
        url: "http://www.example.com/#{page_name}"
        once: ->,
        connection: {encrypted: false}
        headers: {},
      }

      got_headers= {}
      fake_response= {
        setHeader: (key, value) -> got_headers[key]= value
        getHeader: (key) -> got_headers[key]
        on: ->
        once: ->
        emit: ->
        write: ->
        end: ->
      }

      server.on_request(fake_request, fake_response, ->
        expect(got_headers[header_name]).toEqual expected_header_value
        done())


check_request("", "/index.html", "text/html")
check_content("", /Space Wars/)
check_status("", 302);
check_header("", "location", "/game.html");

check_header("", "Set-Cookie", ['yasw_game_id=foo; path=/; httponly']);

check_request("/game.html", "/game.html", "text/html")
check_content("/game.html", /Space Wars/)

check_request("/controllers/ship_command.js", "/controllers/ship_command.js", "text/javascript")
