game = require './../../src/game'

describe 'Game', ->
  the_player=null
  the_game = null
  the_ship =  null

  describe 'with a ship', ->
    describe 'on close', ->

      beforeEach ->
        the_game = new game.Game({})
        the_ship =  the_game.game_field.add_ship({position: [0,0]});
        the_player = the_game.add_player()
        the_game.connect_ship(the_player, the_ship)
        the_game.on_close(the_player)

      it 'removes the player', ->
        expect(the_game.players).toEqual([])

      it 'removes the ship', ->
        expect(the_game.game_field.screen_objects()).toEqual([])
