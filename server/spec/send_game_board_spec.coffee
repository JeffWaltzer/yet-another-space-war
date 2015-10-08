Game= require('../../src/game').Game

describe "sending a game board when our session doesn't have a ship", ->
  message= null
  game= null
  fake_socket= null
  sent_data= null

  beforeEach ->
    fake_socket=
      send: (data) ->
        sent_data= JSON.parse(data)

    game= new Game()
    the_session= game.add_player('session_id')
    the_session.socket= fake_socket;
    game.send_game_board({})

  it "doesn't send a 'you' item in the message", ->
    expect(sent_data.you).not.toBeDefined();

  it "has screen objects", ->
    expect(sent_data.screen_objects).toEqual([]);

describe "sending a game board when our session has a ship", ->
  message= null
  game= null
  fake_socket= null
  sent_data= null
  the_player = null

  beforeEach ->
    fake_socket=
      send: (data) ->
        sent_data= JSON.parse(data)

    game= new Game()
    the_player= game.add_player('session_id')
    the_player.socket= fake_socket;
    the_player.ship = game.add_ship()
    game.send_game_board({})

  it "sends a 'you' item as a string", ->
    expect(typeof sent_data.you).toBe 'string'

  it "sends a 'you' item in the message", ->
    expect(sent_data.you).toEqual(the_player.ship.id)

  xit "has screen objects", ->
    expect(sent_data.screen_objects).toEqual(['xyzzy']);
