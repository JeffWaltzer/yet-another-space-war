require("./vector_equals")
Vector= require("./../../src/vector").Vector

describe "Vector creation", ->
  v= undefined
  describe "with no arguments", ->
    beforeEach ->
      v= new Vector()

    it "has the right x", ->
      expect(v.x()).toEqual(0)

    it "has the right y", ->
      expect(v.y()).toEqual(0)

    it "has the right coordinates", ->
      expect(v.coordinates).toEqual([0, 0])

  describe "from a two-element array", ->
    beforeEach ->
      v= new Vector([10, 20])

    it "has the right x", ->
      expect(v.x()).toEqual(10)

    it "has the right y", ->
      expect(v.y()).toEqual(20)

    it "has the right coordinates", ->
      expect(v.coordinates).toEqual([10, 20])

  describe "from a three-element array", ->
    beforeEach ->
      v= new Vector([10, 20, 5])

    it "has the right x", ->
      expect(v.x()).toEqual(2)

    it "has the right y", ->
      expect(v.y()).toEqual(4)

    it "has the right coordinates", ->
      expect(v.coordinates).toEqual([2, 4])

  describe "from an object", ->
    beforeEach ->
        v= new Vector({
          magnitude: 10,
          heading: Math.PI/2
        })

    it "has the right x", ->
      expect(v.x()).toBeCloseTo(0, 6)

    it "has the right y", ->
      expect(v.y()).toBeCloseTo(10, 6)

  describe "Vector creation errors", ->
    it "barfs when handed a non-vector, non-hash", ->
      expect(->
        new Vector(10)
      ).toThrow()

    it "barfs when handed a short array", ->
      expect(->
        new Vector([10])
      ).toThrow()

    it "barfs when handed a long array", ->
      expect(->
        new Vector([15, 25, 35, 42])
      ).toThrow()

    it "barfs when handed an object with no magnitude", ->
      expect(->
        new Vector({heading: 0})
        ).toThrow()

    it "barfs when handed an object with no heading", ->
      expect(->
        new Vector({magnitude: 5})
        ).toThrow()

  describe "Vector#equal", ->
    describe "two numerically identical vectors", ->
      it "are equal", ->
        expect(new Vector([10, 20])).toEqualVector(new Vector([10, 20]))

    describe "two numerically different vectors", ->
      it "are not equal", ->
        expect(new Vector([10, 20])).not.toEqualVector(new Vector([15, 23]))

    describe "a vector and a non-vector", ->
      it "are not equal", ->
        expect(new Vector([1, 2])).not.toEqualVector("ferd")
