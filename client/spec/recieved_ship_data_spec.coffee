describe 'recieving shipdata', ->
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
  )

  it 'dispatches', ->
    createController()
    game_server.web_socket.emit('message', '{"0": [[0,0],[1,1]]}')
    expect(scope.ships[0].points).toEqual([[0,0],[1,1]])
