ship= require '../../src/ship'

describe "Ship#update", ->
  describe "when there's no thrust", ->
    it "doesn't change the velocity", ->
      the_ship= new ship.Ship({velocity: [1,1], heading: Math.PI/3, acceleration: 0});
      the_ship.update(0, 2, 1);

      expect(the_ship.velocity).toEqual([1,1])

  describe "when there's thrust", ->
    it "updates the velocity", ->
      the_ship= new ship.Ship({velocity: [0,0], heading: Math.PI/4, acceleration: 1})
      the_ship.update(0, 2, 1)

      expect(the_ship.velocity[0]).toBeCloseTo(Math.sqrt(2)/4)
      expect(the_ship.velocity[1]).toBeCloseTo(Math.sqrt(2)/4)

  describe "when the velocity is zero", ->
    it "doesn't change the position", ->
      the_ship= new ship.Ship({velocity: [0,0], location: [10, 15], heading: Math.PI})
      the_ship.update(0, 2, 1)

      expect(the_ship.location[0]).toBeCloseTo(10)
      expect(the_ship.location[1]).toBeCloseTo(15)

  describe "when the velocity is non-zero", ->
    it "updates the position", ->
      the_ship= new ship.Ship({velocity: [1,2], location: [20, 25], heading: Math.PI})
      the_ship.update(0, 2, 1)

      expect(the_ship.location[0]).toBeCloseTo(20 + 1/2)
      expect(the_ship.location[1]).toBeCloseTo(25 + 2/2)

    
