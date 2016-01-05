yasw = require './../../src/yasw_server'
_= require 'underscore'


describe 'default game settings', ->
  yasw_server = undefined
  game = undefined
  settings=[
    'bullet_life_time'
    'bullet_speed'
  ]

  beforeEach ->
    yasw_server = yasw.createServer()
    game =  yasw_server.game

  _(settings).each (parameter) ->
    it "gets #{parameter} from the server", ->
      expect(game[parameter]).toEqual(yasw_server[parameter])

  it "gets field_size from the server", ->
    expect(game.field_size()).toEqual(yasw_server.field_size)
