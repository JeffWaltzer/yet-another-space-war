yasw = require './../../src/yasw_server'
ship = require './../../src/ship'

describe "connecting to the server", ->
  server= undefined
  fake_socket = undefined
  beforeEach ->
    server= yasw.createServer();
    spyOn(server, 'add_ship').andCallThrough();

    fake_socket= {};
    fake_socket.send= ->
    fake_socket.on= ->
    server.on_new_connection(fake_socket)

  it "calls server#add_ship", ->
    expect(server.add_ship).toHaveBeenCalled()

  it 'associates ship with socket' , ->
    expect(fake_socket.ship).toBeDefined();