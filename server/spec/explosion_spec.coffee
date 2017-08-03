underscore = require('underscore')
game = require './../../src/game'
ship = require './../../src/ship'
Vector = require('./../../src/vector').Vector
fragment_maker = require './../../src/fragment_maker'
Player= require('./../../src/player').Player

describe "ship#explode" , ->
  the_game = undefined
  the_ship = undefined

  beforeEach ->
    the_game= new game.Game({
      tick_rate: 20,
      ship_rotation_rate: 10,
      acceleration_rate: 5
    });

    the_ship = the_game.game_field.add_ship({
        position: [0, 0],
        points: [[1, 1], [5, 1], [5, 5], [1, 5]],
        velocity: [5,10]
      }
    )

    spyOn(global, 'setTimeout')
    the_ship.explode()

  it 'removes ship', ->
    expect(the_game.game_field.screen_objects()).not.toContain(the_ship)

  it 'sets a resurrection timer on the player', ->
    expect(global.setTimeout).toHaveBeenCalledWith(the_ship.player().add_ship, Player.resurrection_time);

  it 'adds fragments', ->
    fragments= underscore.select(
      the_game.game_field.screen_objects(), (screen_object) ->
        screen_object.is_fragment())
    expect(fragments.length).toBeGreaterThan(0)

  afterEach ->
    the_game = null
