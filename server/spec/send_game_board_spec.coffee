Game= require('../../src/game').Game
Vector= require('../../src/vector').Vector

describe "sending a game board when our player doesn't have a ship", ->
  message= null
  game= null
  fake_socket= null
  sent_data= null

  beforeEach ->
    fake_socket=
      send: (data) ->
        sent_data= JSON.parse(data)

    game= new Game()
    the_player= game.add_player('player_id')
    the_player.socket= fake_socket;
    game.send_game_board({})

  it "doesn't send a 'you' item in the message", ->
    expect(sent_data.you).toBeNull();

  it "has screen objects", ->
    expect(sent_data.screen_objects).toEqual([]);

  it "has field size", ->
    expect(sent_data.field_size).toEqual([800,600]);


describe "sending the field size", ->
  message= null
  game= null
  fake_socket= null
  sent_data= null

  beforeEach ->
    fake_socket=
      send: (data) ->
        sent_data= JSON.parse(data)

    game= new Game({field_size: new Vector([1001,1002])})

    the_player= game.add_player('player_id')
    the_player.socket= fake_socket;
    game.send_game_board({})

  it "has field size", ->
    expect(sent_data.field_size).toEqual([1001,1002]);


describe "sending a game board when our player has a ship", ->
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
    the_player= game.add_player('player_id')
    the_player.socket= fake_socket;
    the_player.ship = game.game_field.add_ship({
      player: the_player,
      position: [201,303]}
    )

    game.send_game_board(game.game_field.game_board())

  it "sends a 'you' item as a string", ->
    expect(typeof sent_data.you).toBe 'string'

  it "sends a 'you' item in the message", ->
    expect(sent_data.you).toEqual(the_player.ship.id)

  it "has one screen object"  , ->
    expect(sent_data.screen_objects.length).toEqual 1

  describe "the first screen object",  ->
    screen_object = null
    beforeEach ->
      screen_object = sent_data.screen_objects[0]

    it "has outline", ->
      expect(screen_object.wireframe._points).toEqual [ [ 191, 313 ], [ 221, 303 ], [ 191, 293 ], [ 201, 303 ] ]

    it "has id", ->
      expect(screen_object.id).toEqual '0'

    it "has position", ->
      expect(screen_object.position).toEqual [ 201, 303 ]

    it "has score", ->
      expect(screen_object.score).toEqual(0)

