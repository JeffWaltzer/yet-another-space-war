bullet = require './../../src/bullet'
ship = require './../../src/ship'
game = require './../../src/game'

describe "bullet", ->
  the_bullet = undefined

  beforeEach ->
    the_bullet = new bullet.Bullet({})

  it "creates buller", ->
    expect(the_bullet).toBeDefined()

  it 'has default position', ->
    expect(the_bullet.position.x()).toEqual(0)
    expect(the_bullet.position.y()).toEqual(0)

  it 'has default age', ->
    expect(the_bullet.life_left).toEqual(0)

  it 'has default velocity', ->
    expect(the_bullet.velocity.x()).toEqual(0)
    expect(the_bullet.velocity.y()).toEqual(0)

describe "bullet with explicit values", ->
  the_bullet = undefined
  fake_ship = undefined

  beforeEach ->
    the_game = new game.Game({})
    fake_ship =  the_game.add_ship();
    the_bullet = new bullet.Bullet {
      position: [3, 4]
      velocity: [5, 6]
      ship: fake_ship
    }

  it 'has correct position' , ->
    expect(the_bullet.position.x()).toEqual(3)
    expect(the_bullet.position.y()).toEqual(4)

  it 'has correct velocity' , ->
    expect(the_bullet.velocity.x()).toEqual(5)
    expect(the_bullet.velocity.y()).toEqual(6)

  it 'has correct ship', ->
    expect(the_bullet.ship).toEqual(fake_ship)
