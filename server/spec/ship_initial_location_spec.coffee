inject_random_numbers= require('./inject_random_numbers')

game= require '../../src/game'
vector= require '../../src/vector'

describe 'creating a ship', ->
  the_game= undefined
  
  beforeEach ->
    the_game= new game.Game({})

  describe 'without specifying the starting position', ->
    the_ship= undefined
    beforeEach ->
      inject_random_numbers([0.5, 0.75])
      the_ship= the_game.game_field.add_ship()

    it 'puts the ship at a random position', ->
      expect(the_ship.position().x()).toEqual(Math.round(0.5  * the_game.game_field.field_size().x()))
      expect(the_ship.position().y()).toEqual(Math.round(0.75 * the_game.game_field.field_size().y()))

  describe 'does not place a new ship on top of an existing ship', ->
    first_ship= undefined
    second_ship= undefined
    fake_random_values= []
    fake_random= ->
      fake_random_values.shift()

    beforeEach ->
      fake_random_values= [0.5, 0.75, 0.5, 0.75, 0.1, 0.2]
      spyOn(Math, 'random').andCallFake(fake_random)
      first_ship= the_game.game_field.add_ship()
      second_ship= the_game.game_field.add_ship()

    it 'puts the ship at a third position', ->
      expect(second_ship.position().x()).toEqual(Math.round(0.1  * the_game.game_field.field_size().x()))
      expect(second_ship.position().y()).toEqual(Math.round(0.2 * the_game.game_field.field_size().y()))

  describe 'at a specified location', ->
    the_ship= undefined

    beforeEach ->
      the_ship= the_game.game_field.add_ship({position: [314, 278]})

    it 'puts the ship at the specified position', ->
      expect(the_ship.position().x()).toEqual(314)
      expect(the_ship.position().y()).toEqual(278)
