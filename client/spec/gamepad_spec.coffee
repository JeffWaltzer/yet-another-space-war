describe "Gamepad", ->
  beforeEach module("YASW")

  the_gamepad = null
  Gamepad = null

  beforeEach inject((_Gamepad_) ->
    Gamepad = _Gamepad_
    the_gamepad = new Gamepad('us')

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
  )

  it 'updates from dom gamepad into gamepad state', ->
    expect(the_gamepad.last_gamepad_state.buttons[0].pressed).toBeTruthy()
