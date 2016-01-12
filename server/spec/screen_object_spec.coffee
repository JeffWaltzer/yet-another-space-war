Game = require( './../../src/game').Game
screen_object = require './../../src/screen_object'

describe 'screen object', ->
  it 'have distinct ids',->
    game= new Game()
    screen_object1 = game.add_screen_object {update: ->}
    screen_object2 = game.add_screen_object {update: ->}

    expect(screen_object1.id).not.toEqual(screen_object2.id)

  it 'that was deleted does not get its id reused',->
    game= new Game()
    screen_object1 = game.add_screen_object {update: ->}
    game.screen_objects([])
    screen_object2 = game.add_screen_object {update: ->}

    expect(screen_object1.id).not.toEqual(screen_object2.id)
