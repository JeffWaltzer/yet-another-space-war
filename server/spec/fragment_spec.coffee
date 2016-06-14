fragment = require './../../src/fragment'
ship = require './../../src/ship'
game = require './../../src/game'

describe "fragment", ->
  the_fragment = undefined

  beforeEach ->
    the_fragment = new fragment.Fragment({})

  it "creates a fragment", ->
    expect(the_fragment.is_fragment()).toBe(true);

  it "does not create a bullet", ->
    expect(the_fragment.is_bullet()).toBe(false);

  it "does not create a ship", ->
    expect(the_fragment.is_ship()).toBe(false);

  it 'has default position', ->
    expect(the_fragment.position().x()).toEqual(0)
    expect(the_fragment.position().y()).toEqual(0)

  it 'has the correct shape', ->
    expect(the_fragment.outline()).toEqual([[0, 0], [5, 0], [2.5, 4.33]])

  it 'has default age', ->
    expect(the_fragment.life_left).toEqual(3)

  it 'has default velocity', ->
    expect(the_fragment.velocity.x()).toEqual(0)
    expect(the_fragment.velocity.y()).toEqual(0)


describe "fragment with explicit values", ->
  the_fragment = undefined

  beforeEach ->
    the_fragment = new fragment.Fragment {
      position: [3, 4]
      velocity: [5, 6]
    }

  it 'has correct position' , ->
    expect(the_fragment.position().x()).toEqual(3)
    expect(the_fragment.position().y()).toEqual(4)

  it 'has correct velocity' , ->
    expect(the_fragment.velocity.x()).toEqual(5)
    expect(the_fragment.velocity.y()).toEqual(6)
