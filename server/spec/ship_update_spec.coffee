ship= require '../../src/ship'
yasw= require '../../src/yasw_server'

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

      expect(the_ship.location.x).toBeCloseTo(10)
      expect(the_ship.location.y).toBeCloseTo(15)

  describe "when the velocity is non-zero", ->
    it "updates the position", ->
      the_ship= new ship.Ship({velocity: [1,2], location: [20, 25], heading: Math.PI})
      the_ship.update(0, 2, 1)

      expect(the_ship.location.x).toBeCloseTo(20 + 1/2)
      expect(the_ship.location.y).toBeCloseTo(25 + 2/2)

    
  describe 'when going off the screen', ->
    server= undefined
    beforeEach ->
      server=yasw.createServer({})

    it 'top', ->
      the_ship= new ship.Ship({velocity: [0,1], location: [0, server.top_edge - 1], heading: Math.PI})
      the_ship.update(0, 1, 0)
      expect(the_ship.location.y).toBeCloseTo(0)

    it 'bottom', ->
      the_ship= new ship.Ship({velocity: [0,-1], location: [0, 0], heading: Math.PI})
      the_ship.update(0, 1, 0)
      expect(the_ship.location.y).toBeCloseTo(server.top_edge - 1)

    it 'right', ->
      the_ship= new ship.Ship({debug: true, velocity: [1,0], location: [server.right_edge - 1,0], heading: Math.PI})
      the_ship.update(0, 1, 0)
      expect(the_ship.location.x).toBeCloseTo(0)

    it 'left', ->
      the_ship= new ship.Ship({debug: true, velocity: [-1,0], location: [0,0], heading: Math.PI})
      the_ship.update(0, 1, 0)
      expect(the_ship.location.x).toBeCloseTo(server.right_edge - 1)

