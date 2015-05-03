angular.module('YASW').controller('ShipCommandController', function($scope, game_server, SVG) {
  var left_key_up= function() {return $scope.left_key === 'up';};
  var left_key_down= function() {return $scope.left_key === 'down';};
  var right_key_up= function() {return $scope.right_key === 'up';};
  var right_key_down= function() {return $scope.right_key === 'down';};

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
      if (left_key_up() && right_key_up())
        game_server.send('rotate_left');
      else if (left_key_up() && right_key_down())
        game_server.send('rotate_stop');
      $scope.left_key='down';
      break;
    case 39:
      if (left_key_up() && right_key_up())
        game_server.send('rotate_right');
      else if (left_key_down() && right_key_up())
        game_server.send('rotate_stop');
      $scope.right_key='down';
      break;
    }
  };

	$scope.onKeyUp= function(e) {
    switch (e.keyCode) {
    case 37:
      if (left_key_down() && right_key_down())
        game_server.send('rotate_right');
      else if (left_key_down() && right_key_up())
        game_server.send('rotate_stop');
      $scope.left_key='up';
      break;
    case 39:
      if (left_key_down() && right_key_down())
        game_server.send('rotate_left');
      else if (left_key_up() && right_key_down())
        game_server.send('rotate_stop');
      $scope.right_key='up';
      break;
    }
  };
});
