game = require('./../../src/game')
ship = require('./../../src/ship')

describe 'game shoots bullet for ship', ->
  the_game=undefined
  new_bullet=undefined
  new_ship=undefined

  beforeEach ->
    the_game = new game.Game({tick_rate: 0})
    new_ship = the_game.add_ship({
      rotation: 0
      points: [[-10,10],[20, 0],[-10,-10],[0,0]]
      heading: 0
      position: [100,100]
      gun_point: [21,0]
    })
    new_bullet = new_ship.fire()

  it 'starts bullet in correct position', ->
    expect(the_game.screen_objects[1]).toEqual(new_bullet)

  it 'starts bullet in correct position', ->
    expect(new_bullet.position.x()).toEqual(new_ship.gun_point().x())
    expect(new_bullet.position.y()).toEqual((new_ship.gun_point().y()))
