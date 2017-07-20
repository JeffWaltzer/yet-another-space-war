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
    the_player= game.add_player()
    the_player.socket= fake_socket;
    game.send_game_board({})

  it "has screen objects", ->
    expect(sent_data.polygons).toEqual([]);

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

    # Smell: shouldn't need player
    the_player= game.add_player()
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
  the_ship= null

  beforeEach ->
    fake_socket=
      send: (data) ->
        sent_data= JSON.parse(data)

    game= new Game()
    the_player= game.add_player()
    the_player.socket= fake_socket;
    the_ship = game.game_field.add_ship({
      position: [201,303]}
    )
    game.connect_ship(the_player, the_ship)

    game.send_game_board(game.game_field.game_board())

  it "has one screen object", ->
    expect(sent_data.polygons.length).toEqual 1

  describe "the first screen object",  ->
    screen_object_json = null
    beforeEach ->
      screen_object_json = sent_data.polygons[0]

    it "has outline", ->
      expect(screen_object_json.wireframe[0].points).toEqual [ [ 191, 313 ], [ 221, 303 ], [ 191, 293 ], [ 201, 303 ] ]

    it "has position", ->
      expect(screen_object_json.position).toEqual [ 201, 303 ]

    it "has score", ->
      expect(screen_object_json.score).toEqual(0)

    it "is green", ->
      expect(screen_object_json.wireframe[0].color).toEqual('green')
