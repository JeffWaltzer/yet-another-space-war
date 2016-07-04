inject_random_numbers= require('./inject_random_numbers')
game = require './../../src/game'
ship = require './../../src/ship'
Vector = require('./../../src/vector').Vector
underscore = require('underscore')

describe "ship#explode" , ->
  the_game = undefined
  the_ship = undefined

  beforeEach ->
    the_game= new game.Game({
      tick_rate: 20,
      ship_rotation_rate: 10,
      acceleration_rate: 5
    });

    the_ship = the_game.add_ship({
        position: [0, 0],
        points: [[1, 1], [5, 1], [5, 5], [1, 5]],
        velocity: [5,10]
      }
    )

    inject_random_numbers(
        [0.1,
        1, 0, 0.5,
        0, 1, 0.5,
        1, 1, 0.5,
        ])
    the_ship.explode()

  it 'removes ship', ->
    expect(the_game.game_field.screen_objects()).not.toContain(the_ship)

  it 'adds fragments', ->
    fragments= underscore.select(
      the_game.game_field.screen_objects(), (screen_object) ->
        screen_object.is_fragment())
    expect(fragments.length).toEqual(3)

  describe "the first fragment", -> 
    fragments= undefined
    the_fragment= undefined

    beforeEach ->
      fragments= fragments= underscore.select(
        the_game.game_field.screen_objects(), (screen_object) ->
          screen_object.is_fragment())
      the_fragment= fragments[0]

    it "has an x velocity of 55", ->
      expect(the_fragment.velocity.x()).toEqual(55)

    it "has a y velocity of -40", ->
      expect(the_fragment.velocity.y()).toEqual(-40)

  describe "the second fragment", -> 
    fragments= undefined
    the_fragment= undefined

    beforeEach ->
      fragments= fragments= underscore.select(
        the_game.game_field.screen_objects(), (screen_object) ->
          screen_object.is_fragment())
      the_fragment= fragments[1]

    it "has an x velocity of -45", ->
      expect(the_fragment.velocity.x()).toEqual(-45)

    it "has a y velocity of 60", ->
      expect(the_fragment.velocity.y()).toEqual(60)

  describe "the third fragment", -> 
    fragments= undefined
    the_fragment= undefined

    beforeEach ->
      fragments= fragments= underscore.select(
        the_game.game_field.screen_objects(), (screen_object) ->
          screen_object.is_fragment())
      the_fragment= fragments[2]

    it "has an x velocity of 55", ->
      expect(the_fragment.velocity.x()).toEqual(55)
 
    it "has a y velocity of 40", ->
      expect(the_fragment.velocity.y()).toEqual(60)

  afterEach ->
    the_game = null
