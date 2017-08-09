# player = require './../../src/player'
# game = require './../../src/game'
# GameField= require('./../../src/game_field').GameField
Game= require('./../../src/game').Game

describe 'Player', ->
  the_player=null
  the_game= null

  beforeEach ->
    the_game= new Game()
    the_player = the_game.add_player()

  describe 'with no ship', ->
    it 'ignores on_message', ->
      expect ->
        the_player.on_message('{}')
        .not.toThrow()


  describe "#add_ship", ->
    the_ship= null

    beforeEach ->
      the_ship= the_player.add_ship(the_game.game_field)

    it "adds a ship", ->
      expect(the_game.game_field.screen_objects()[0]).toEqual(the_ship)

    it "connects the new ship to the player", ->
      expect(the_ship.player()).toEqual(the_player)
      expect(the_player.ship).toEqual(the_ship)
