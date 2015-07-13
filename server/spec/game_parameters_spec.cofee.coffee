yasw = require './../../src/yasw_server'
_= require 'underscore'


describe 'default game settings', ->
  yasw_server = undefined
  game = undefined
  settings=[
    'bullet_life_time'
    'field_size'
    'bullet_speed'
  ]

  beforeEach ->
    yasw_server = yasw.createServer()
    game =  yasw_server.game

  _(settings).each (parameter) ->
    it "gets #{parameter} from the server", ->
      expect(game[parameter]).toEqual(yasw_server[parameter])
