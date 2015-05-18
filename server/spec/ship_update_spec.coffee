ship= require '../../src/ship'

describe "Ship#update", ->
  describe "when there's no thrust", ->
    it "doesn't change the velocity", ->
      the_ship= new ship.Ship({velocity: [1,1], heading: Math.PI/3});
      the_ship.update(0, 2, 0);

      expect(the_ship.velocity).toEqual([1,1])

  describe "when there's thrust", ->
    it "updates the velocity", ->
      the_ship= new ship.Ship({velocity: [0,0], heading: Math.PI/4})
      the_ship.update(0, 2, 1)

      expect(the_ship.velocity[0]).toBeCloseTo(Math.sqrt(2)/4)
      expect(the_ship.velocity[1]).toBeCloseTo(Math.sqrt(2)/4)

  describe "when the velocity is zero", ->
    xit "doesn't change the position"

  describe "when the velocity is non-zero", ->
    xit "updates the position"
    
