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
    game_server.web_socket.emit('message', '{"0": [[0,0],[1,1]], "1": [[2,2],[3,3]]}')
  )

  it 'dispatches the ship 0 coordinates', ->
    expect(scope.screen_objects()[0].polygon_string).toEqual('0,0 1,1')

  it 'dispatches the ship 1 coordinates', ->
    expect(scope.screen_objects()[1].polygon_string).toEqual('2,2 3,3')

  it 'kicks off a digest cycle', ->
    expect(scope.$digest).toHaveBeenCalled()
