NullPlayer= require('./../../src/null_player').NullPlayer
GameField= require('./../../src/game_field').GameField

describe "NullPlayer", ->
  null_player= null
  game_field= null

  beforeEach ->
    null_player= new NullPlayer()
    game_field= new GameField({})

  describe "#add_ship", ->
    it "does not add a ship", ->
      original_number_of_screen_objects= game_field.screen_objects().length
      null_player.add_ship()
      expect(game_field.screen_objects().length).toEqual(original_number_of_screen_objects)
