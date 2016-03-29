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
    fake_socket.request =
      headers: {"cookie": "yasw_player_id=0.5468260888010263" }
    server.game.players['0.5468260888010263']= new player.Player();
    server.on_new_websocket(fake_socket)

  it "calls server#add_screen_object", ->
    expect(server.game.game_field.add_screen_object).toHaveBeenCalled()

  it 'associates ship with socket' , ->
    expect(server.game.players['0.5468260888010263'].ship).toBeDefined();

  it 'creates a player', ->
    expect(server.game.players['0.5468260888010263'].socket).toEqual fake_socket


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
      fake_socket.request =
        headers: {"cookie": "yasw_player_id=0.5468260888010263"}
      server.on_new_websocket(fake_socket)
      fake_socket

    server.game.players['0.5468260888010263'] = new player.Player();
    socket1=create_fake_socket()
    socket2=create_fake_socket()

  it 'has one ship' ,->
    expect(server.game.game_field.screen_objects.length).toEqual(1)

  it "calls server#add_screen_object", ->
    expect(server.game.game_field.add_screen_object).toHaveBeenCalled()

  it 'associates ship with socket' , ->
    expect(server.game.players['0.5468260888010263'].ship).toBeDefined();

  it 'creates a player', ->
    expect(server.game.players['0.5468260888010263'].socket).toEqual socket2
