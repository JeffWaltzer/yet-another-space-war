bullet = require './../../src/bullet'
ship = require './../../src/ship'
game = require './../../src/game'

describe 'bullet in ship is colliding', ->
  the_ship = null
  the_bullet = null
  the_game = null

  beforeEach ->
    the_game = new game.Game({})

  it 'collides if bullet overlaps ship', ->
    the_ship =  the_game.add_ship(
      position: [0,0]
    );
    the_bullet = the_game.add_bullet {
      position: [-10, 10]
    }
    expect(game.collided(the_ship, the_bullet)).toBeTruthy()

#  it 'collides if at same point edges do not intersect', ->
#    the_ship =  the_game.add_ship(
#      position: [0,0]
#    );
#    the_bullet = the_game.add_bullet {
#      position: [5, 0]
#    }
#    expect(game.collided(the_ship, the_bullet)).toBeTruthy()
#
#  it 'does not collided if at different points', ->
#    the_ship =  the_game.add_ship(
#      position: [0,0]
#    );
#    the_bullet = the_game.add_bullet {
#      position: [10, 20]
#    }
#    expect(game.collided(the_ship, the_bullet)).toBeFalsy()
