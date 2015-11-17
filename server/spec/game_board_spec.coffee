Game= require('../../src/game').Game
Ship= require('../../src/ship').Ship

describe "generating a game board", ->
  game= null
  expected_x= null
  expected_y= null

  beforeEach ->
    game= new Game()

  describe "when we have no ships", ->
    it "creates the correct game board", ->
      expect(game.game_board()).toEqual({})

  describe "when we have a ship", ->
    player= null

    beforeEach ->
      expected_x= 100
      expected_y= 200
      player= game.add_player('the_player')
      ship= game.add_ship(
        game: game,
        player: player,
        position: [expected_x, expected_y],
        points: [[0, 1], [2, 3]])
      game.connect_ship('the_player', ship)

    it "creates the correct game board", ->
      expect(game.game_board()).toEqual [{id: '0', score: 0, position: [expected_x, expected_y], outline: [[100,201], [102,203]]}]

  describe "when we have a ship and the player has a non-zero score", ->
    player= null

    beforeEach ->
      expected_x= 100
      expected_y= 200
      player= game.add_player('the_player')
      player.bump_score();
      ship= game.add_ship(
        game: game,
        player: player,
        position: [expected_x, expected_y],
        points: [[0, 1], [2, 3]])
      game.connect_ship('the_player', ship)

    it "creates the correct game board", ->
      expect(game.game_board()).toEqual [{id: '0', score: 1, position: [expected_x, expected_y], outline: [[100,201], [102,203]]}]
