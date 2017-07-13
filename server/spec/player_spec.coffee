player = require './../../src/player'
game = require './../../src/game'

describe 'Player', ->
  the_player=null

  describe 'with no ship', ->

    beforeEach ->
      the_player = new player.Player()

    it 'ignores on_message', ->
      expect ->
        the_player.on_message('{}')
        .not.toThrow()
