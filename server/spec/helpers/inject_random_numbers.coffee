fake_random_values= []

fake_random= ->
  fake_random_values.shift()

inject_random_numbers= (to_inject)->
  spyOn(Math, 'random').andCallFake(fake_random)
  fake_random_values= to_inject

module.exports= inject_random_numbers

