bullet = require './../../src/bullet'

describe "bullet", ->
  the_bullet = undefined

  beforeEach ->
    the_bullet = new bullet.Bullet()

  it "creates buller", ->
    expect(the_bullet).toBeDefined()

  it 'has default position', ->
    expect(the_bullet.position.x()).toEqual(0)
    expect(the_bullet.position.y()).toEqual(0)


  it 'has default velocity', ->
    expect(the_bullet.velocity.x()).toEqual(0)
    expect(the_bullet.velocity.y()).toEqual(0)
