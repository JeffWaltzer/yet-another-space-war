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
