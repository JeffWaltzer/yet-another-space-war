describe "keyboard service", ->
  keyboard= null
  beforeEach module("YASW")
  beforeEach inject (_keyboard_)->
    keyboard= _keyboard_

  it "does something", ->
    expect(keyboard).not.toBeNull()
