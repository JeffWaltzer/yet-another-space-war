GameField= require( '../../src/game_field.js').GameField
underscore= require('underscore')

describe 'game field', ->
  describe '#remove_dead_objects', ->
    game_field= undefined
    ship = undefined
    it 'adds fragments for a ship', ->
      game_field= new GameField({})
      ship = game_field.add_ship()
      game_field.remove_screen_objects([ship])
      expect(underscore.select(
        game_field.screen_objects()
        (screen_object) ->
          screen_object.is_ship()
      )).toEqual([])







