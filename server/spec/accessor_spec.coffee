describe 'accessor class method', ->
  SomeClass = ->

  beforeEach ->
    SomeClass.accessor('some_variable')

  it 'has an accessor', ->
    expect(typeof SomeClass.prototype.some_variable).toEqual('function')

describe 'an object with accessor', ->
  an_object = null

  beforeEach ->
    SomeClass = ->
    SomeClass.accessor('some_variable')
    an_object = new SomeClass

  it 'has an initial value of undefined', ->
    expect(an_object.some_variable()).not.toBeDefined()

  it 'remembers a set value', ->
    an_object.some_variable('FERD')
    expect(an_object.some_variable()).toEqual('FERD')
