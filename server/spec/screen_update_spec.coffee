screen_object = require './../../src/screen_object'


describe 'Screen Object', ->
  it 'has bounding box', ->
    thing = new screen_object.ScreenObject({
      points: [[1, 1],[5,1],[5,5],[1,5]]
      position: [11,13]
    })

    expect(thing.bounding_box).toEqual
      top: 18
      bottom: 14
      left: 12
      right: 16

