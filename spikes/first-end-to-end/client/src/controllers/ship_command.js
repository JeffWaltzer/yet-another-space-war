angular.module('YASW').controller('ShipCommandController', function($scope, game_server) {
  var left_key_up= function() {return $scope.left_key === 'up';};
  var left_key_down= function() {return $scope.left_key === 'down';};
  var right_key_up= function() {return $scope.right_key === 'up';};
  var right_key_down= function() {return $scope.right_key === 'down';};

  $scope.left_key='up';
  $scope.right_key='up';

  $scope.onKeyEvent= function(event) {
    switch (event) {
    case 'left_down':
      if (left_key_up() && right_key_up())
        game_server.send('rotate_left');
      else if (left_key_up() && right_key_down())
        game_server.send('rotate_stop');
      $scope.left_key='down';
      break;
    case 'left_up':
      if (left_key_down() && right_key_down())
        game_server.send('rotate_right');
      else if (left_key_down() && right_key_up())
        game_server.send('rotate_stop');
      $scope.left_key='up';
      break;
    case 'right_down':
      if (left_key_up() && right_key_up())
        game_server.send('rotate_right');
      else if (left_key_down() && right_key_up())
        game_server.send('rotate_stop');
      $scope.right_key='down';
      break;
    case 'right_up':
      if (left_key_down() && right_key_down())
        game_server.send('rotate_left');
      else if (left_key_up() && right_key_down())
        game_server.send('rotate_stop');
      $scope.right_key='up';
      break;
    }
  };
});
