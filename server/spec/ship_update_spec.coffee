ship = require '../../src/ship'
game = require '../../src/game'

describe "Ship#update", ->
  the_game = undefined

  beforeEach ->
    the_game = new game.Game({
      tick_rate: 20,
    });

  describe "when ship fires", ->
    it "asks game to create a bullet", ->
      spyOn(the_game.game_field,'add_bullet')
      the_ship= the_game.game_field.add_ship({velocity: [1,1], heading: Math.PI/3, acceleration: 0})
      the_ship.fire()
      expect(the_game.game_field.add_bullet).toHaveBeenCalled()

  describe "when there's no thrust", ->
    it "doesn't change the velocity", ->
      the_ship= the_game.game_field.add_ship({velocity: [1,1], heading: Math.PI/3, acceleration: 0})
      the_ship.update(2);

      expect(the_ship.velocity().x()).toEqual(1)
      expect(the_ship.velocity().y()).toEqual(1)

  describe "when there's thrust", ->
    it "updates the velocity", ->
      the_ship= the_game.game_field.add_ship({velocity: [0,0], heading: Math.PI/4, acceleration: 1})
      the_ship.update(2)

      expect(the_ship.velocity().x()).toBeCloseTo(Math.sqrt(2)/4)
      expect(the_ship.velocity().y()).toBeCloseTo(Math.sqrt(2)/4)

  describe "when the velocity is zero", ->
    it "doesn't change the position", ->
      the_ship= the_game.game_field.add_ship({velocity: [0,0], position: [10, 15], heading: Math.PI})
      the_ship.update(2)

      expect(the_ship.position().x()).toBeCloseTo(10)
      expect(the_ship.position().y()).toBeCloseTo(15)

  describe "when the velocity is non-zero", ->
    it "updates the position", ->
      the_ship= the_game.game_field.add_ship({velocity: [1,2], position: [20, 25], heading: Math.PI})
      the_ship.update(2)

      expect(the_ship.position().x()).toBeCloseTo(20 + 1/2)
      expect(the_ship.position().y()).toBeCloseTo(25 + 2/2)

    
  describe 'when going off the screen', ->
    it 'top', ->
      the_ship= the_game.game_field.add_ship({velocity: [0,1], position: [0, the_game.game_field.field_size().y() - 1], heading: Math.PI})
      the_ship.update(1)
      expect(the_ship.position().y()).toBeCloseTo(0)

    it 'bottom', ->
      the_ship= the_game.game_field.add_ship({velocity: [0,-1], position: [0, 0], heading: Math.PI})
      the_ship.update(1)
      expect(the_ship.position().y()).toBeCloseTo(the_game.game_field.field_size().y() - 1)

    it 'right', ->
      the_ship= the_game.game_field.add_ship({velocity: [1,0], position: [the_game.game_field.field_size().x() - 1,0], heading: Math.PI})
      the_ship.update(1)
      expect(the_ship.position().x()).toBeCloseTo(0)

    it 'left', ->
      the_ship= the_game.game_field.add_ship({velocity: [-1,0], position: [0,0], heading: Math.PI})
      the_ship.update(1)
      expect(the_ship.position().x()).toBeCloseTo(the_game.game_field.field_size().x() - 1)

