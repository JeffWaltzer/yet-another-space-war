Game= require('../../src/game').Game
Ship= require('../../src/ship').Ship
Polygon= require('../../src/polygon').Polygon

util= require('util');

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
      expect(game_board).toEqual([])

  describe "when we have a ship that's connected to a player", ->
    player= null
    game_board = null

    beforeEach ->
      expected_x= 100
      expected_y= 200
      player= game.add_player()
      ship= game_field.add_ship({
          player: player,
          position: [expected_x, expected_y],
      })
      ship.shape( [new Polygon([[0, 1], [2, 3]],'puce')])
      game.connect_ship(player, ship)
      game_board = game.game_field.game_board()

    it "creates the correct game board", ->
      expect(game_board).toEqual [{
        score: 0,
        position: [expected_x, expected_y],
        wireframe: [{points: [[100, 201], [102, 203]], color: 'green'}]
      }]

  describe "when we have a ship that's not connected to a player", ->
    player= null
    game_board = null

    beforeEach ->
      expected_x= 100
      expected_y= 200
      ship= game_field.add_ship({
          position: [expected_x, expected_y],
      })
      ship.shape( [new Polygon([[0, 1], [2, 3]])])
      ship.update_outline()
      game_board = game.game_field.game_board()

    it "creates the correct game board", ->
      expect(game_board).toEqual [{
        score: undefined,
        position: [expected_x, expected_y],
        wireframe: [{points: [[100, 201], [102, 203]], color: 'white'}]
      }]

  describe "when we have two ships connected to different players", ->
    first_player= null
    second_player= null
    game_board = null

    beforeEach ->
      expected_x= 100
      expected_y= 200
      first_player= game.add_player()
      first_players_ship= game_field.add_ship({
          player: first_player,
          position: [expected_x, expected_y],
      })
      game.connect_ship(first_player, first_players_ship)

      second_player= game.add_player()
      second_players_ship= game_field.add_ship({
          player: second_player,
          position: [expected_x, expected_y],
      })
      game.connect_ship(second_player, second_players_ship)

      game_board = game.game_field.game_board()

    it "creates the correct game board", ->
      expect(game_board).toEqual [
        {
          score: 0,
          position: [expected_x, expected_y],
          wireframe: [{points: [ [ 90, 210 ], [ 120, 200 ], [ 90, 190 ], [ 100, 200 ] ], color: Game.player_colors[0]}]
        },
        {
          score: 0,
          position: [expected_x, expected_y],
          wireframe: [{points: [ [ 90, 210 ], [ 120, 200 ], [ 90, 190 ], [ 100, 200 ] ], color: Game.player_colors[1]}]
        }
      ]

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
      )
      game.connect_ship(player, ship)
      game_board = game.game_field.game_board()

    it "creates the correct game board", ->
      expect(game_board).toEqual [{
        score: 1,
        position: [expected_x, expected_y],
        wireframe: [{points: [ [ 90, 210 ], [ 120, 200 ], [ 90, 190 ], [ 100, 200 ] ], color: 'green'}]
      }]

  describe "when we have a ship with a jet", ->
    player= null
    game_board = null

    beforeEach ->
      expected_x= 0
      expected_y= 0
      ship= game_field.add_ship(
        game_field: game_field,
        position: [expected_x, expected_y],
      )
      ship.shape( [new Polygon([[0,0], [0,1]]),
                   new Polygon([[0,0], [1,0]], 'red')])
      ship.update_outline()
      game_board = game.game_field.game_board()

    it "creates the correct game board", ->
      expect(game_board).toEqual [{
        score: undefined,
        position: [expected_x, expected_y],
        wireframe: [{points: [ [ 0, 0 ], [ 0, 1] ], color: 'white'},
                    {points: [ [ 0, 0 ], [ 1, 0] ], color: 'red'}]
      }]

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
      expect(game_field.screen_objects()).toEqual([])
