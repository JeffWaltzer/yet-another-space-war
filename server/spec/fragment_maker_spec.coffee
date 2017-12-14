underscore = require('underscore')
inject_random_numbers= require('./inject_random_numbers')
game = require './../../src/game'
fragment = require './../../src/fragment'
fragment_maker = require './../../src/fragment_maker'
Polygon= require('./../../src/polygon').Polygon;

describe 'fragment making', ->
  the_game = undefined
  the_ship = undefined

  beforeEach ->
    the_game = new game.Game({
      tick_rate: 20,
      ship_rotation_rate: 10,
      acceleration_rate: 5
    });

    the_ship = the_game.game_field.add_ship({
        position: [0, 0],
        velocity: [5, 10]
      }
    )

    inject_random_numbers(
      [0.2,
        1, 0, 0.5, 0.5,
        0, 1, 0.5, 0.5,
        1, 1, 0.5, 0.5,
        0, 0, 0,
      ])

    fragment_maker.add_fragments(the_game.game_field, the_ship.position(), the_ship.velocity());


  describe "the first fragment", ->
    fragments = undefined
    the_fragment = undefined

    beforeEach ->
      fragments = underscore.select(
        the_game.game_field.screen_objects(), (screen_object) ->
          screen_object.is_fragment())
      the_fragment = fragments[0]

    it "has an x velocity of 55", ->
      expect(the_fragment.velocity().x()).toEqual(55)

    it "has a y velocity of -40", ->
      expect(the_fragment.velocity().y()).toEqual(-40)

    it 'has first fragment shape', ->
      expect(the_fragment.outline()).toEqual([new Polygon(fragment_maker.fragment_shapes[0])])

  describe "the second fragment", ->
    fragments = undefined
    the_fragment = undefined

    beforeEach ->
      fragments = underscore.select(
        the_game.game_field.screen_objects(), (screen_object) ->
          screen_object.is_fragment())
      the_fragment = fragments[1]

    it "has an x velocity of -45", ->
      expect(the_fragment.velocity().x()).toEqual(-45)

    it "has a y velocity of 60", ->
      expect(the_fragment.velocity().y()).toEqual(60)

    it 'has second fragment shape', ->
      expect(the_fragment.outline()).toEqual([new Polygon(fragment_maker.fragment_shapes[1])])

  describe "the third fragment", ->
    fragments = undefined
    the_fragment = undefined

    beforeEach ->
      fragments = underscore.select(
        the_game.game_field.screen_objects(), (screen_object) ->
          screen_object.is_fragment())
      the_fragment = fragments[2]

    it "has an x velocity of 55", ->
      expect(the_fragment.velocity().x()).toEqual(55)

    it "has a y velocity of 40", ->
      expect(the_fragment.velocity().y()).toEqual(60)

    it 'has third fragment shape', ->
      expect(the_fragment.outline()).toEqual([new Polygon(fragment_maker.fragment_shapes[2])])
