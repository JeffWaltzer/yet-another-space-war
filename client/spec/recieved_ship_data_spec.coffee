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
        you: "1",
        field_size: [314, 217],
        screen_objects: [
          {id: '1', score: 23, position: [0,0],      wireframe: [[0,0],[1,1]]}
          {id: '2', score: 42, position: [200, 400], wireframe: [[202,402],[203,403]]}])
    )
  it 'kicks off a digest cycle', ->
    expect(scope.$digest).toHaveBeenCalled()

  it 'dispatches the ship 0 coordinates', ->
    expect(scope.screen_objects()[0].polygon_string).toEqual('0,0 1,1')

  it 'dispatches the ship 0 score', ->
    expect(scope.screen_objects()[0].score).toEqual(23)

  it 'dispatches the ship 0 position', ->
    expect(scope.screen_objects()[0].position).toEqual([0, 0])

  it 'dispatches the ship 1 coordinates', ->
    expect(scope.screen_objects()[1].polygon_string).toEqual('202,402 203,403')

  it 'dispatches the ship 1 score', ->
    expect(scope.screen_objects()[1].score).toEqual(42)

  it 'dispatches the ship 1 position', ->
    expect(scope.screen_objects()[1].position).toEqual([200, 400])

  it "sets the correct color for our ship", ->
    expect(scope.screen_objects()[1].color).toEqual('white')

  it "sets the correct color for the other ship", ->
    expect(scope.screen_objects()[0].color).toEqual('green')

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
    game_server.web_socket.emit('message', '{"screen_objects": {"3248": {"wireframe": [[0,0],[1,1]]}, "31416": {"wireframe": [[2,2],[3,3]]}}}')
    game_server.web_socket.emit('message', '{"screen_objects": {"31416": {"wireframe": [[2,2],[3,3]]}}}')
  )
  it 'deletes a ship', ->
    expect(scope.screen_objects().length).toEqual(1)

  it 'keeps the correct ship (judged by coordinates)', ->
    expect(scope.screen_objects()[0].polygon_string).toEqual('2,2 3,3')

