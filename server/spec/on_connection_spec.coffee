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
    server.game.sessions['0.5468260888010263']= {}
    server.on_new_websocket(fake_socket)

  it "calls server#add_screen_object", ->
    expect(server.game.add_screen_object).toHaveBeenCalled()

  it 'associates ship with socket' , ->
    expect(server.game.sessions['0.5468260888010263'].ship).toBeDefined();

  it 'creates a session', ->
    expect(server.game.sessions['0.5468260888010263'].socket).toEqual fake_socket
