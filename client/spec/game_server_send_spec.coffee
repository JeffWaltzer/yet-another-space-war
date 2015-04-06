describe "game_server", ->
  beforeEach module("YASW")

  game_server= undefined
  beforeEach inject((_game_server_) ->
    game_server = _game_server_
  )

  events= ['rotate_left', 'rotate_right', 'rotate_stop']

  _.each(events, (e) ->
    describe "when passed a '#{e}'", ->
      it "sends it along to the server", ->
        spyOn(game_server.web_socket, 'send')
        game_server.send(e)
        expect(game_server.web_socket.send).toHaveBeenCalledWith("{\"command\":\"#{e}\"}");
        )
