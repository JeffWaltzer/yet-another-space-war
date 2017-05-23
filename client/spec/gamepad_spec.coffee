describe "Gamepad", ->
  beforeEach module("YASW")

  the_gamepad = null
  Gamepad = null

  beforeEach inject((_Gamepad_) ->
    Gamepad = _Gamepad_
    the_gamepad = new Gamepad('us')
  )

  it 'updates from dom gamepad into gamepad state', ->
    Gamepad.dom_gamepads = ->
      [
        {
          id: 'them'
          buttons: [
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
          ]
        },
        {
          id: 'us',
          buttons: [
            {pressed: true},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
            {pressed: false},
          ]
        }
      ]

    the_gamepad.poll_gamepad()



    expect(the_gamepad.last_gamepad_state.buttons[0].pressed).toBeTruthy()


#  game_server= undefined
#  beforeEach inject((_game_server_) ->
#    game_server = _game_server_
#  )

#  events= ['rotate_left', 'rotate_right', 'rotate_stop']
#
#  _.each(events, (e) ->
#    describe "when passed a '#{e}'", ->
#      it "sends it along to the server", ->
#        spyOn(game_server.web_socket, 'send')
#        game_server.send(e)
#        expect(game_server.web_socket.send).toHaveBeenCalledWith("{\"command\":\"#{e}\"}");
#  )
