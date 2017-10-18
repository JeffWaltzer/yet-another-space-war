underscore = require 'underscore'
game = require './../../src/game'
ship = require './../../src/ship'

describe "game#tick when ship and bullet collide" , ->
  the_game = undefined

  beforeEach ->
    the_game= new game.Game({
      tick_rate: 20,
      ship_rotation_rate: 10,
      acceleration_rate: 5
    });
    the_game.game_field.add_ship(  {position: [0, 0], points: [[1, 1],[5,1],[5,5],[1,5]]})
    the_game.game_field.add_bullet({game_field: the_game.game_field, points: [[1, 1],[3,1],[3,3],[1,3]]})
    the_game.tick()

  it 'removes ship and bullet', ->
    remaining_screen_objects= underscore.reject(
      the_game.game_field.screen_objects(),
      (screen_object) ->
        screen_object.is_fragment())

    expect(the_game.game_field.ships().length).toEqual(0)
    expect(the_game.game_field.bullets().length).toEqual(0)

  afterEach ->
    the_game = null
