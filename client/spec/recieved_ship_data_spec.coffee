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
    game_server.web_socket.emit('message', '0')
    game_server.web_socket.emit('message', '{"0": [[0,0],[1,1]]}')
  )

  it 'dispatches the protocol version number', ->
    expect(scope.protocol_version).toEqual('0')

  it 'dispatches the ship coordinates', ->
    expect(scope.ships[0].points).toEqual([[0,0],[1,1]])

  it 'dispatches the ship coordinates', ->
    expect(scope.ship_points_string()).toEqual('0,0 1,1');

  it 'kicks off a digest cycle', ->
    expect(scope.$digest).toHaveBeenCalled()