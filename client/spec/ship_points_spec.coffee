describe 'updating the ship wireframes', ->
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
    game_server.update_ship_wireframes({"0": {"wireframe":  [{"points": [[0,0],[1,1]]}]}, "1": {"wireframe": [{"points": [[2,2],[3,3]]}]}});
  )

  it 'dispatches the ship 0 coordinates', ->
    expect(scope.polygons()[0].polygon_string).toEqual('0,0 1,1')

  it 'dispatches the ship 1 coordinates', ->
    expect(scope.polygons()[1].polygon_string).toEqual('2,2 3,3')
