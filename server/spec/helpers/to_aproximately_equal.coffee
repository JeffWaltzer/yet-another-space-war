custom_matchers=
  toAproximatelyEqual: (util, customEqualityTesters) ->
    return {
      compare: (actual, expected) ->
        result= {};
        result.pass= true;
        result.message= '';
        if actual.length != expected.length
          result.pass= false;
          result.message= "arrays are not the same size: expected: #{expected.length}; actual: #{actual.length}";
          return result;

        underscore.each underscore.zip(actual, expected), (point_pair) ->
          expected_value= point_pair[0]
          actual_value= point_pair[1]
          if Math.abs(actual[0] - expected[0]) > 1e-6
            result.pass= false;
          if Math.abs(actual[1] - expected[1]) > 1e-6
            result.pass= false;
        result
      }

exports.custom_matchers= custom_matchers;
