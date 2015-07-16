bullet = require './../../src/bullet'
ship = require './../../src/ship'
game = require './../../src/game'

describe 'bullet and ship', ->
  the_ship = null
  the_bullet = null
  the_game = null

  beforeEach ->
    the_game = new game.Game({})

  it 'collide if bullet overlaps ship', ->
    the_ship =  the_game.add_ship(
      position: [0,0]
    );
    the_bullet = the_game.add_bullet {
      position: [-10, 10]
    }
    expect(game.collided(the_ship, the_bullet)).toBeTruthy()

  it 'collide if bullet completely inside ship', ->
    the_ship =  the_game.add_ship(
      position: [0,0]
    );
    the_bullet = the_game.add_bullet {
      position: [5, 0]
    }
    expect(game.collided(the_ship, the_bullet)).toBeTruthy()

  it 'do not collide if at different points', ->
    the_ship =  the_game.add_ship(
      position: [0,0]
    );
    the_bullet = the_game.add_bullet {
      position: [10, 20]
    }
    expect(game.collided(the_ship, the_bullet)).toBeFalsy()

  it 'other', ->
    the_ship = the_game.add_ship(  {position: [0, 0], points: [[1, 1],[5,1],[5,5],[1,5]]})
    the_bullet = the_game.add_bullet({points: [[1, 1],[3,1],[3,3],[1,3]]})
    expect(game.collided(the_ship, the_bullet)).toBeTruthy()
