angular.module('YASW').controller('ShipCommandController', function($scope, game_server, SVG) {
  var key_state= function(key, state) { return $scope[key + '_key'] === state; };
  var rotation_keys_state= function(left, right) {
    return key_state('left', left) && key_state('right', right);
  };

  var KEY_LEFT_ARROW= 37;
  var KEY_RIGHT_ARROW= 39;
  var KEY_DOWN_ARROW= 40;

  $scope.ships= function() { return game_server.ships; };
  $scope.protocol_version= null;

  game_server.on_message= function(raw_data) {
    if ($scope.protocol_version === null)
      $scope.protocol_version= raw_data;
    else {
      var data = JSON.parse(raw_data);
      _.each(data, function(value, id) {
        if (!$scope.ships()[id])
          $scope.ships()[id] = {};
        $scope.ships()[id].points = value;
      });
    }
    $scope.$digest();
  };
  game_server.web_socket.on('message', game_server.on_message);

  $scope.ship_points_string= function() {
    if ($scope.ships().length > 0 && $scope.ships()[0].points)
      return SVG.polygon_string($scope.ships()[0].points);
    return '';
  };

  $scope.left_key= 'up';
  $scope.right_key= 'up';
  $scope.down_key= 'up';

	$scope.onKeyDown= function(e) {
    switch (e.keyCode) {
    case KEY_LEFT_ARROW:
      if (rotation_keys_state('up', 'up'))
        game_server.send('rotate_left');
      else if (rotation_keys_state('up', 'down'))
        game_server.send('rotate_stop');
      $scope.left_key='down';
      break;
    case KEY_RIGHT_ARROW:
      if (rotation_keys_state('up', 'up'))
        game_server.send('rotate_right');
      else if (rotation_keys_state('down', 'up'))
        game_server.send('rotate_stop');
      $scope.right_key='down';
      break;
    case KEY_DOWN_ARROW:
      if (key_state('down', 'up'))
        game_server.send('thrust_on');
      $scope.down_key= 'down';
      break;
    }
  };

	$scope.onKeyUp= function(e) {
    switch (e.keyCode) {
    case KEY_LEFT_ARROW:
      if (rotation_keys_state('down', 'down'))
        game_server.send('rotate_right');
      else if (rotation_keys_state('down', 'up'))
        game_server.send('rotate_stop');
      $scope.left_key='up';
      break;
    case KEY_RIGHT_ARROW:
      if (rotation_keys_state('down', 'down'))
        game_server.send('rotate_left');
      else if (rotation_keys_state('up', 'down'))
        game_server.send('rotate_stop');
      $scope.right_key='up';
      break;
    case KEY_DOWN_ARROW:
      if (key_state('down', 'down'))
        game_server.send('thrust_off');
      $scope.down_key= 'up';
      break;
    }
  };
});
