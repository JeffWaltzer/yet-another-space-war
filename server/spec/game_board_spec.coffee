Game= require('../../src/game').Game
Ship= require('../../src/ship').Ship

describe "generating a game board", ->
  game= null

  beforeEach ->
    game= new Game()

  describe "when we have no ships", ->
    it "creates the correct game board", ->
      expect(game.game_board()).toEqual({})

  describe "when we have a ship", ->
    beforeEach ->
      game.add_screen_object(new Ship({game: game, points: [[0, 1], [2, 3]]}))

    it "creates the correct game board", ->
      expect(game.game_board()).toEqual 0: {outline: [[0,1], [2,3]]}

  afterEach ->
    game= null
