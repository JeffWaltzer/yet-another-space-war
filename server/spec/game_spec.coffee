game = require('./../../src/game')
ship = require('./../../src/ship')

describe 'game shoots bullet for ship', ->
  it 'starts bullet in correct position', ->
    game = new game.Game({tick_rate: 0})
    new_ship = new ship.Ship({
      rotation: 0
      points: [[-10,10],[20, 0],[-10,-10],[0,0]]
      heading: 0
      location: [100,100]
      game: game
    })
    game.add_ship(new_ship)
    new_bullet= new_ship.fire()
    expect(game.ships[1]).toEqual(new_bullet)