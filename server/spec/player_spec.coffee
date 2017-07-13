player = require './../../src/player'
game = require './../../src/game'

describe 'Player', ->
  describe 'with no ship', ->

    it 'ignores on_close', ->
      the_player = new player.Player()
      expect ->
        the_player.on_close('something', {})
          .not.toThrow()

    it 'ignores on_message', ->
      the_player = new player.Player()
      expect ->
        the_player.on_message('{}')
        .not.toThrow()

  describe 'with a ship', ->
    describe 'on close', ->
      it 'removes the player', ->
        the_game = new game.Game({})
        the_ship =  the_game.game_field.add_ship({position: [0,0]});
        the_player = the_game.add_player()
        the_game.connect_ship(the_player, the_ship)
        the_game.on_close(the_player)
        expect(the_game.players).toEqual([])
        expect(the_game.game_field.screen_objects()).toEqual([])
