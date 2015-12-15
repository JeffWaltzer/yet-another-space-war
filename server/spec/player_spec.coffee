player = require './../../src/player'

describe 'Player', ->
  describe 'with no ship', ->
  it 'ignore call', ->
    player= new player.Player()
    expect ->
      player.on_message('{}')
    .not.toThrow()
