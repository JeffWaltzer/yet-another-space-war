bullet = require './../../src/bullet'
ship = require './../../src/ship'
game = require './../../src/game'
vector = require './../../src/vector'

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

describe 'single ship collides with', ->
  the_ship = null
  the_bullet = null
  the_game = null

  beforeEach ->
    the_game = new game.Game({})

  it 'ship does not collide with self', ->
    the_ship = the_game.add_ship()
    expect(the_game.collisions_with(the_ship,0)).toEqual([])

  it 'detects ship with other ship collisions', ->
    ship1 = the_game.add_ship(position: [10,10])
    ship2 = the_game.add_ship(position: [10,10])
    expect(the_game.collisions_with(ship1,0)).toEqual([ship2])

  it 'does not collide non-overlapping ships', ->
    ship1 = the_game.add_ship(position: [11,12])
    ship2 = the_game.add_ship(position: [100,100])
    expect(the_game.collisions_with(ship1,0)).toEqual([])

  it 'ships do not collide when positioned into different locations', ->
    ship1 = the_game.add_ship(position: [400,450])
    ship2 = the_game.add_ship(position: [400,450])
    ship2.position(new vector.Vector([80,120]))
    expect(the_game.collisions_with(ship1,0)).toEqual([])

  it 'ships do collide when positioned into same locations', ->
    ship1 = the_game.add_ship(position: [400,450])
    ship2 = the_game.add_ship()
    ship2.position(new vector.Vector([400,450]))
    expect(the_game.collisions_with(ship1,0)).toEqual([ship2])

describe "A bullet fired from ship A colliding with ship B", ->
  the_game= null
  a_session= null
  b_session= null
  ship_a= null
  ship_b= null
  the_bullet= null

  beforeEach ->
    the_game= new game.Game({})

    a_session= the_game.add_session('a')
    ship_a= the_game.add_ship()
    the_game.connect_ship('a', ship_a)

    ship_b= the_game.add_ship()
    b_session= the_game.add_session('b')
    the_game.connect_ship('b', ship_b)

    the_bullet= ship_a.fire()
    the_bullet.position(ship_b.position())
    the_game.handle_collisions()

  it "increments ship A's score", ->
    expect(ship_a.score()).toEqual(1)

  it "doesn't increment ship B's score", ->
    expect(ship_b.score()).toEqual(0)
