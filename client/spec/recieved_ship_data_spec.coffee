describe 'recieving shipdata', ->
  beforeEach module('YASW')
  game_server = undefined
  createController = undefined
  scope = undefined

  beforeEach inject(($rootScope, $controller, _game_server_)  ->
    game_server= _game_server_

    scope = $rootScope.$new()
    spyOn(scope, '$digest').and.callThrough();

    createController = (_socket_) ->
      $controller "ShipCommandController",
        $scope: scope
        socket: _socket_

    createController()
    game_server.web_socket.emit('message',
      JSON.stringify
        field_size: [314, 217],
        polygons: [
          {score: 23, position: [0,0],      wireframe: [{points: [[0,0],[1,1]] , color: 'white'    }]}
          {score: 42, position: [200, 400], wireframe: [
            {points: [[202,402],[203,403]], color: 'green'     },
            {points: [[102,403],[103,404]], color: 'red'     }
            ]}])
    )
  it 'kicks off a digest cycle', ->
    expect(scope.$digest).toHaveBeenCalled()

  it 'dispatches the ship 0 coordinates', ->
    expect(scope.polygons()[0].polygon_string).toEqual('0,0 1,1')

  it 'dispatches the ship 0 score', ->
    expect(scope.polygons()[0].score).toEqual(23)

  it 'dispatches the ship 0 position', ->
    expect(scope.polygons()[0].position).toEqual([0, 0])

  it 'dispatches the ship 1 coordinates', ->
    expect(scope.polygons()[1].polygon_string).toEqual('202,402 203,403')

  it 'dispatches the ship 1 score', ->
    expect(scope.polygons()[1].score).toEqual(42)

  it 'dispatches the ship 1 flame score', ->
    expect(scope.polygons()[2].score).toBeNull()

  it 'dispatches the ship 1 position', ->
    expect(scope.polygons()[1].position).toEqual([200, 400])

  it "sets the correct color for the other ship", ->
    expect(scope.polygons()[0].color).toEqual('white')

  it "sets the correct color for our ship", ->
    expect(scope.polygons()[1].color).toEqual('green')

  it "sets the correct color for our ship's jet", ->
    expect(scope.polygons()[2].color).toEqual('red')

  it 'dispatches the ship 1 jet coordinates', ->
    expect(scope.polygons()[2].polygon_string).toEqual('102,403 103,404')

  it "sets the field size", ->
    expect(scope.field_size).toEqual([314,217])

describe "removing a dead ship's data", ->
  beforeEach module('YASW')
  game_server = undefined
  createController = undefined
  scope = undefined

  beforeEach inject(($rootScope, $controller, _game_server_)  ->
    game_server= _game_server_
    scope = $rootScope.$new()

    createController = (_socket_) ->
      $controller "ShipCommandController",
        $scope: scope
        socket: _socket_

    createController()
    game_server.web_socket.emit('message', '{"polygons": {"3248": {"wireframe": [{"points": [[0,0],[1,1]]}]}, "31416": {"wireframe": [{"points":[[2,2],[3,3]]}]}}}')
    game_server.web_socket.emit('message', '{"polygons": {                                      "31416": {"wireframe": [{"points": [[2,2],[3,3]]}]}}}')
  )

  it 'deletes a ship', ->
    expect(scope.polygons().length).toEqual(1)

  it 'keeps the correct ship (judged by coordinates)', ->
    expect(scope.polygons()[0].polygon_string).toEqual('2,2 3,3')

