game = require './../../src/game'
ship = require './../../src/ship'
vector = require './../../src/vector'

describe 'Ship fires a bullet', ->
  describe "when moving in the same direction it's pointed", ->
    it 'creates a bullet', ->
      the_game = new game.Game
        ship_rotation_rate: 1
        tick_rate: 1
        acceleration_rate: 1
        field_size: new vector.Vector([900,900])
        bullet_speed: 10

      the_ship = the_game.add_ship({velocity: [50, 50], heading: Math.PI/4})
      bullet = the_ship.fire()

      expect(bullet.velocity.x()).toBeCloseTo(50 + 10/Math.sqrt(2), 1e-6)
      expect(bullet.velocity.y()).toBeCloseTo(50 + 10/Math.sqrt(2), 1e-6)


  describe "bullet fired from stationary ship heading PI/4", ->
    it 'creates a bullet heading PI/4', ->
      the_game = new game.Game
        ship_rotation_rate: 1
        tick_rate: 10
        acceleration_rate: 1
        field_size: new vector.Vector([900,900])
        bullet_speed: 10

      the_ship = the_game.add_ship({velocity: [0, 0], heading: Math.PI/4})
      bullet = the_ship.fire()

      expect(bullet.velocity.x()).toBeCloseTo( 10/Math.sqrt(2), 1e-6)
      expect(bullet.velocity.y()).toBeCloseTo( 10/Math.sqrt(2), 1e-6)

  describe "bullet fired from stationary ship heading PI/2", ->
    it 'creates a bullet heading PI/2', ->
      the_game = new game.Game
        ship_rotation_rate: 1
        tick_rate: 10
        acceleration_rate: 1
        field_size: new vector.Vector([900,900])
        bullet_speed: 10

      the_ship = the_game.add_ship({velocity: [0, 0], heading: Math.PI/2})
      bullet = the_ship.fire()

      expect(bullet.velocity.x()).toBeCloseTo( 0, 1e-6)
      expect(bullet.velocity.y()).toBeCloseTo( 10, 1e-6)


  describe "when moving perpindicular to the direction it's pointed", ->
    it 'creates a bullet', ->
      the_game = new game.Game
        ship_rotation_rate: 1
        tick_rate: 15
        acceleration_rate: 1
        field_size: new vector.Vector([900,900])
        bullet_speed: 10

      the_ship = the_game.add_ship({velocity: [50, 50], heading: Math.PI*3/4})
      bullet = the_ship.fire()

      expect(bullet.velocity.x()).toBeCloseTo(50 - 10/Math.sqrt(2), 1e-6)
      expect(bullet.velocity.y()).toBeCloseTo(50 + 10/Math.sqrt(2), 1e-6)
