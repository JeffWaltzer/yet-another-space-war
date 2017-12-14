bullet = require './../../src/bullet'
ship = require './../../src/ship'
game = require './../../src/game'

describe "bullet", ->
  the_bullet = undefined

  beforeEach ->
    the_bullet = new bullet.Bullet({})

  it "creates bullet", ->
    expect(the_bullet.is_bullet()).toEqual(true)

  it 'has default position', ->
    expect(the_bullet.position().x()).toEqual(0)
    expect(the_bullet.position().y()).toEqual(0)

  it 'has default age', ->
    expect(the_bullet.life_left).toEqual(0)

  it 'has default velocity', ->
    expect(the_bullet.velocity().x()).toEqual(0)
    expect(the_bullet.velocity().y()).toEqual(0)

  it 'has the correct mass', ->
    expect(the_bullet.mass()).toEqual(0.01)

describe "bullet with explicit values", ->
  the_bullet = undefined
  fake_ship = undefined
  fake_player = undefined

  beforeEach ->
    the_game = new game.Game({})
    fake_player = the_game.add_player('Britany Spears')
    fake_ship =  the_game.game_field.add_ship();
    the_bullet = new bullet.Bullet {
      position: [3, 4]
      velocity: [5, 6]
      ship: fake_ship
      player: fake_player
    }

  it 'has correct position' , ->
    expect(the_bullet.position().x()).toEqual(3)
    expect(the_bullet.position().y()).toEqual(4)

  it 'has correct velocity' , ->
    expect(the_bullet.velocity().x()).toEqual(5)
    expect(the_bullet.velocity().y()).toEqual(6)

  it 'has correct player', ->
    expect(the_bullet.player()).toEqual(fake_player)
