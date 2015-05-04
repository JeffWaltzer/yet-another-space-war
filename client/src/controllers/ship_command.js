angular.module('YASW').controller('ShipCommandController', function($scope, game_server, SVG) {
  var down_key_down= function() {return $scope.down_key === 'down';};

  var key_state= function(key, state) { return $scope[key + '_key'] === state; };

  $scope.ships=[];
  $scope.protocol_version= null;

  game_server.web_socket.on('message', function(raw_data) {
    if ($scope.protocol_version === null)
      $scope.protocol_version= raw_data;
    else {
      var data = JSON.parse(raw_data);
      var id = Object.keys(data)[0];

      if (!$scope.ships[id])
        $scope.ships[id] = {};
      $scope.ships[id].points = data[id];
    }
    $scope.$digest();
  });

  $scope.ship_points_string= function() {
    if ($scope.ships.length > 0 && $scope.ships[0].points)
      return SVG.polygon_string($scope.ships[0].points);
    return '';
  };

  $scope.left_key= 'up';
  $scope.right_key= 'up';
  $scope.down_key= 'up';

	$scope.onKeyDown= function(e) {
    switch (e.keyCode) {
    case 37:
      if (key_state('left', 'up') && key_state('right', 'up'))
        game_server.send('rotate_left');
      else if (key_state('left', 'up') && key_state('right', 'down'))
        game_server.send('rotate_stop');
      $scope.left_key='down';
      break;
    case 39:
      if (key_state('left', 'up') && key_state('right', 'up'))
        game_server.send('rotate_right');
      else if (key_state('left', 'down') && key_state('right', 'up'))
        game_server.send('rotate_stop');
      $scope.right_key='down';
      break;
    case 40:
      if (key_state('down', 'up'))
        game_server.send('thrust_on');
      break;
    }
  };

	$scope.onKeyUp= function(e) {
    switch (e.keyCode) {
    case 37:
      if (key_state('left', 'down') && key_state('right', 'down'))
        game_server.send('rotate_right');
      else if (key_state('left', 'down') && key_state('right', 'up'))
        game_server.send('rotate_stop');
      $scope.left_key='up';
      break;
    case 39:
      if (key_state('left', 'down') && key_state('right', 'down'))
        game_server.send('rotate_left');
      else if (key_state('left', 'up') && key_state('right', 'down'))
        game_server.send('rotate_stop');
      $scope.right_key='up';
      break;
    case 40:
      if (key_state('down', 'down'))
        game_server.send('thrust_off');
      break;
    }
  };
});
