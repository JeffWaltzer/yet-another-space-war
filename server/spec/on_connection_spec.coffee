yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

describe "connecting to the server", ->
  server= undefined
  fake_socket = undefined
  beforeEach ->
    server= yasw.createServer();
    spyOn(server.game, 'add_screen_object').andCallThrough();

    fake_socket= {};
    fake_socket.send= ->
    fake_socket.on= ->
    fake_socket.request =
      headers: {"cookie": "yasw_game_id=0.5468260888010263" }
    server.game.players['0.5468260888010263']= {}
    server.on_new_websocket(fake_socket)

  it "calls server#add_screen_object", ->
    expect(server.game.add_screen_object).toHaveBeenCalled()

  it 'associates ship with socket' , ->
    expect(server.game.players['0.5468260888010263'].ship).toBeDefined();

  it 'creates a session', ->
    expect(server.game.players['0.5468260888010263'].socket).toEqual fake_socket



describe "connecting to the server twice", ->
  server= undefined
  socket1= undefined
  socket2= undefined

  beforeEach ->
    server= yasw.createServer();
    spyOn(server.game, 'add_screen_object').andCallThrough();

    create_fake_socket = ->
      fake_socket = {};
      fake_socket.send = ->
      fake_socket.on = ->
      fake_socket.request =
        headers: {"cookie": "yasw_game_id=0.5468260888010263"}
      server.on_new_websocket(fake_socket)
      fake_socket

    server.game.players['0.5468260888010263'] = {}
    socket1=create_fake_socket()
    socket2=create_fake_socket()

  it 'has one ship' ,->
    expect(server.game.screen_objects.length).toEqual(1)

  it "calls server#add_screen_object", ->
    expect(server.game.add_screen_object).toHaveBeenCalled()

  it 'associates ship with socket' , ->
    expect(server.game.players['0.5468260888010263'].ship).toBeDefined();

  it 'creates a session', ->
    expect(server.game.players['0.5468260888010263'].socket).toEqual socket2
