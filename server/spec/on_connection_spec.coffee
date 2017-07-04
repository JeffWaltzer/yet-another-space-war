yasw = require './../../src/yasw_server'
ship = require './../../src/ship'
player = require './../../src/player'

describe "connecting to the server", ->
  server= undefined
  fake_socket = undefined
  beforeEach ->
    server= yasw.createServer();
    spyOn(server.game.game_field, 'add_screen_object').andCallThrough();

    fake_socket= {};
    fake_socket.send= ->
    fake_socket.on= ->
    server.on_new_websocket(fake_socket)

  it "calls server#add_screen_object", ->
    expect(server.game.game_field.add_screen_object).toHaveBeenCalled()

  it 'associates ship with socket' , ->
    expect(server.game.players[0].ship).toBeDefined();

  it 'creates a player', ->
    expect(server.game.players[0].socket).toEqual fake_socket


describe "connecting to the server twice", ->
  server= undefined
  socket1= undefined
  socket2= undefined

  beforeEach ->
    server= yasw.createServer();
    spyOn(server.game.game_field, 'add_screen_object').andCallThrough();

    create_fake_socket = ->
      fake_socket = {};
      fake_socket.send = ->
      fake_socket.on = ->
      server.on_new_websocket(fake_socket)
      fake_socket

    socket1=create_fake_socket()
    socket2=create_fake_socket()

  it 'has two ships' ,->
    expect(server.game.game_field.screen_objects().length).toEqual(2)

  it "calls server#add_screen_object", ->
    expect(server.game.game_field.add_screen_object.callCount).toEqual(2)

  it 'associates ship with socket' , ->
    expect(server.game.players[0].ship).toBeDefined();

  it 'associates ship with other socket' , ->
    expect(server.game.players[1].ship).toBeDefined();

  it 'creates a player', ->
    expect(server.game.players[0].socket).toEqual socket1

  it 'creates a player', ->
    expect(server.game.players[1].socket).toEqual socket2
