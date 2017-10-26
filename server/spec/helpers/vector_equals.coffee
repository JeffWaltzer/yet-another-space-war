Vector= require("./../../src/vector").Vector

beforeEach ->
  this.addMatchers
    toEqualVector: (expected) ->
      this.actual.equal(expected)

