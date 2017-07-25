describe "Gamepad creation", ->
  beforeEach module("YASW")

  the_gamepad = null
  Gamepad = null

  beforeEach inject((_Gamepad_) ->
    Gamepad = _Gamepad_

    the_gamepad = new Gamepad('us', {send: ->})
  )

  describe "A new gamepad", ->
    the_socket= null
    
    beforeEach  ->
      the_socket= the_gamepad.command_socket()
      spyOn(the_socket, 'send')
      the_gamepad.connect();

    it 'sends a stop-screen-updates command', ->
      raw_first_message= the_socket.send.calls.first().args[0]
      first_message= JSON.parse(raw_first_message)
      expect(first_message.command).toEqual('stop-screen-updates')
