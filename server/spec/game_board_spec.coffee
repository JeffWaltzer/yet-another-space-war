Game= require('../../src/game').Game
Ship= require('../../src/ship').Ship

describe "generating a game board", ->
  game= null
  expected_x= null
  expected_y= null
  game_field= null

  beforeEach ->
    game= new Game()
    game_field= game.game_field

  describe "when we have no ships", ->
    it "creates the correct game board", ->
      game_board = game.game_field.game_board()
      expect(game_board).toEqual({})

  describe "when we have a ship", ->
    player= null
    game_board = null

    beforeEach ->
      expected_x= 100
      expected_y= 200
      player= game.add_player('the_player')
      ship= game_field.add_ship({
          player: player,
          position: [expected_x, expected_y],
          points: [[0, 1], [2, 3]]})
      game.connect_ship('the_player', ship)
      game_board = game.game_field.game_board()

    it "creates the correct game board", ->
      expect(game_board).toEqual [{id: '0', score: 0, position: [expected_x, expected_y], outline: [[100,201], [102,203]]}]

  describe "when we have a ship and the player has a non-zero score", ->
    player= null
    game_board = null

    beforeEach ->
      expected_x= 100
      expected_y= 200
      player= game.add_player('the_player')
      player.bump_score(1);
      ship= game_field.add_ship(
        game_field: game_field,
        player: player,
        position: [expected_x, expected_y],
        points: [[0, 1], [2, 3]])
      game.connect_ship('the_player', ship)
      game_board = game.game_field.game_board()

    it "creates the correct game board", ->
      expect(game_board).toEqual [{id: '0', score: 1, position: [expected_x, expected_y], outline: [[100,201], [102,203]]}]

  describe "GameField#remove_screen_object", ->
    player= null
    game_field = null

    beforeEach ->
      player= game.add_player('the_player')
      game_field = game.game_field
      ship= game_field.add_ship
        game_field: game_field,
        player: player
      game_field.remove_screen_object(ship)

    it "removes the screen object", ->
      expect(game_field.screen_objects().length).toEqual(0)
