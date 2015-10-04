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
    beforeEach ->
      expected_x= 100
      expected_y= 200
      game.add_screen_object(new Ship({game: game, position: [expected_x, expected_y], points: [[0, 1], [2, 3]]}))

    it "creates the correct game board", ->
      expect(game.game_board()).toEqual 0: {score: 0, position: [expected_x, expected_y], outline: [[100,201], [102,203]]}

  afterEach ->
    game= null
    expected_x= null
    expected_y= null
