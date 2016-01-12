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
    the_game.add_ship(  {position: [0, 0], points: [[1, 1],[5,1],[5,5],[1,5]]})
    the_game.add_bullet({points: [[1, 1],[3,1],[3,3],[1,3]]})
    the_game.tick()

  it 'removes ship and bullet', ->
    expect(the_game.screen_objects().length).toEqual(0)

  afterEach ->
    the_game = null
