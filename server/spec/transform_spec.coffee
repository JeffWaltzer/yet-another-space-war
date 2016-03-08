Transform = require('./../../src/new_transform').Transform

custom_matchers=
  myToAproximatelyEqual: (expected) ->
    # DEBUG
    console.log("got here 1");
        # DEBUG
    console.log "(1)actual: #{this.actual}"
    console.log "(1)expected: #{expected}"

  # result= {};
  # result.pass= true;
    this.message= 'Because';
#         if actual.length != expected.length
#           result.pass= false;
#           result.message= "arrays are not the same size: expected: #{expected.length}; actual: #{actual.length}";
#           return result;

#         # DEBUG
#         console.log "(2)actual: #{actual}"
#         console.log "(2)expected: #{expected}"

#         underscore.each underscore.zip(actual, expected), (point_pair) ->
#           expected_value= point_pair[0]
#           actual_value= point_pair[1]

#           # DEBUG
#           console.log "expected_value: #{expected_value}"
#           console.log "actual_value: #{actual_value}"

#           if Math.abs(actual[0] - expected[0]) > 1e-6
#             result.pass= false;
#           if Math.abs(actual[1] - expected[1]) > 1e-6
#             result.pass= false;
# -
    false
# }


describe "the identity transform", ->
  beforeEach ->
    this.addMatchers(custom_matchers)

  # it "maps a point to itself", ->
  #   expect(Transform.transform(Transform.identity,  [3, 4])).myToAproximatelyEqual([3,4], 1e-6)

  # it "maps a different point to itself", ->
  #   expect(Transform.transform(Transform.identity,  [9, 5])).myToAproximatelyEqual([9,5], 1e-6)

  it "fails", ->
    expect([0]).myToAproximatelyEqual([1])
