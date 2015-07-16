game= require '../../src/game'
vector= require '../../src/vector'

describe 'creating a ship', ->
  the_game= undefined
  
  beforeEach ->
    the_game= new game.Game({})
    # this.addMatchers {
    #   toEqualVector: (util, customEqualityTesters) ->
    #     return {
    #       compare: (actual, expected) ->
    #         # DEBUG
    #         console.log("actual: %j; expected: %j", actual, expected)

    #         result= {}
    #         result.pass= true
    #         result.message= ''
    #         if actual.coordinates[0] != expected[0]  ||  actual.coordinates[1] != expected[1]
    #           result.pass= false
    #           result.message= 'did not match'
    #           return result
    #         return result
    #     }
    #   }
    # this.addMatchers({
    #   toEqualVector: (util, customEqualityTesters) ->
    #     return {
    #       compare: (actual, expected) ->
    #         result= {}
    #         result.pass= false
    #         result.message= 'because'
    #         return result
    #     }
    # })

  describe 'without specifying the starting position', ->
    the_ship= undefined
    fake_random_values= []
    fake_random= ->
      fake_random_values.shift()

    beforeEach ->
      fake_random_values= [0.5, 0.75]
      spyOn(Math, 'random').andCallFake(fake_random)
      the_ship= the_game.add_ship()

    it 'puts the ship at a random position', ->
      expect(the_ship.position.x()).toEqual(Math.round(0.5  * the_game.field_size.x()))
      expect(the_ship.position.y()).toEqual(Math.round(0.75 * the_game.field_size.y()))

  describe 'at a specified loaction', ->
    the_ship= undefined

    beforeEach ->
      the_ship= the_game.add_ship(position: [314, 278])

    it 'puts the ship at the specified position', ->
      expect(the_ship.position.x()).toEqual(314)
      expect(the_ship.position.y()).toEqual(278)
