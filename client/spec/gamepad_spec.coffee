describe "Gamepad", ->
  beforeEach module("YASW")

  the_gamepad = null
  Gamepad = null

  beforeEach inject((_Gamepad_) ->
    Gamepad = _Gamepad_

    the_gamepad = new Gamepad('us', {})
    Gamepad.gamepads.push(the_gamepad);

    Gamepad.dom_gamepads = ->
      [
        {
          id: 'us'
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
        },
        {
          id: 'us',
          buttons: [
            {pressed: false},
            {pressed: true},
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

    Gamepad.poll_gamepads()
  )

  it 'updates from dom gamepad into gamepad state', ->
    expect(the_gamepad.last_gamepad_state.buttons[0].pressed).toBeTruthy()

  it 'creates a new gamepad', ->
    expect(Gamepad.gamepads.length).toEqual(2)

  it 'updates the new gamepad', ->
    expect(Gamepad.gamepads[1].last_gamepad_state.buttons[1].pressed).toBeTruthy()
