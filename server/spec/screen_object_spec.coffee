Game = require( './../../src/game').Game
screen_object = require './../../src/screen_object'
Polygon= require('./../../src/polygon').Polygon;

describe 'screen object', ->
  game = undefined
  a_ship= undefined
  a_screen_object= undefined

  beforeEach ->
    game = new Game()
    a_screen_object= new screen_object.ScreenObject
      shape: [new Polygon()]
      mass: 1

  it 'is not a ship', ->
    expect(a_screen_object.is_ship()).toEqual(false)

  it 'is not a bullet', ->
    expect(a_screen_object.is_bullet()).toEqual(false)

  it 'is not a fragment', ->
    expect(a_screen_object.is_fragment()).toEqual(false)

  it 'is white', ->
    expect(a_screen_object.color()).toEqual('white')

  it 'have distinct ids',->
    screen_object1 = game.game_field.add_screen_object {update: ->}
    screen_object2 = game.game_field.add_screen_object {update: ->}

    expect(screen_object1.id).not.toEqual(screen_object2.id)

  it 'that was deleted does not get its id reused',->
    screen_object1 = game.game_field.add_screen_object {update: ->}
    game.game_field.screen_objects([])
    screen_object2 = game.game_field.add_screen_object {update: ->}

    expect(screen_object1.id).not.toEqual(screen_object2.id)

  it 'has a mass of one', ->
    expect(a_screen_object.mass()).toEqual(1)


  it 'requires mass', ->
    expect(->
      new screen_object.ScreenObject({})
    ).toThrow new Error('Mass is required')
