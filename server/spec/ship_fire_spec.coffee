#game = require './../../src/game'
#ship = require './../../src/ship'
#vector = require './../../src/vector'
#
#
#
#describe 'Ship fires a bullet', ->
#  it 'creates bullet', ->
#    the_game = new game.Game
#      ship_rotation_rate: 1
#      tick_rate: 1
#      acceleration_rate: 1
#      field_size: new vector.Vector([900,900])
#    dummy_socket={
#      remoteAddress: 'game.example.com'
#      on: ->
#      send: ->
#    }
#    the_game.add_player(dummy_socket)
#    the_ship = the_game.screen_objects[0]
#    bullet = the_ship.fire()
#    expect(bullet).toBeTruthy()