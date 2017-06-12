describe "Gamepad creation", ->
  beforeEach module("YASW")

  the_gamepad = null
  Gamepad = null

  beforeEach inject((_Gamepad_) ->
    Gamepad = _Gamepad_

    the_gamepad = new Gamepad('us')
  )

  it 'has a websocket', ->
    expect(the_gamepad.command_socket()).toBeTruthy()
