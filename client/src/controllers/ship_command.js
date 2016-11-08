angular.module('YASW').controller('ShipCommandController', ['$scope', 'game_server', 'keyboard', function($scope, game_server, keyboard) {
  var key_in_state= function(key, state) { return keyboard[key + '_key'] === state; };
  var rotation_keys_in_state= function(left, right) {
    return key_in_state('left', left) && key_in_state('right', right);
  };

  $scope.screen_objects= function() { return game_server.screen_objects; };

  game_server.on_message= function(raw_data) {
    var message= JSON.parse(raw_data);
    game_server.update_ship_outlines(message.screen_objects, message.you);
    $scope.field_size= message.field_size;
    $scope.$digest();
  };
  game_server.web_socket.on('message', game_server.on_message);

  keyboard.left_key= 'up';
  keyboard.right_key= 'up';
  keyboard.thrust_key= 'up';
  keyboard.fire_key= 'up';


  $scope.onKeyDown= function(e) {
    switch (e.keyCode) {
    case keyboard.KEY_LEFT_ARROW:
      on_left_arrow_down();
      break;
    case keyboard.KEY_RIGHT_ARROW:
      on_right_arrow_down();
      break;
    case keyboard.KEY_DOWN_ARROW:
      keyboard.on_down_arrow_down();
      break;
    case keyboard.KEY_SPACE:
      keyboard.on_fire_down();
      break;
    case keyboard.KEY_R:
      keyboard.on_clone_down();
      break;
    }
  };

  $scope.onKeyUp= function(e) {
    switch (e.keyCode) {
    case keyboard.KEY_LEFT_ARROW:
      on_left_arrow_up();
      break;
    case keyboard.KEY_RIGHT_ARROW:
      on_right_arrow_up();
      break;
    case keyboard.KEY_DOWN_ARROW:
      keyboard.on_down_arrow_up();
      break;
    case keyboard.KEY_SPACE:
      keyboard.on_fire_up();
      break;
    }
  };

//--------------------------------------------------------------

  var on_left_arrow_down= function() {
    if (rotation_keys_in_state('up', 'up'))
      game_server.send('rotate_left');
    else if (rotation_keys_in_state('up', 'down'))
      game_server.send('rotate_stop');
    keyboard.left_key='down';
  };

  var on_left_arrow_up = function() {
    if (rotation_keys_in_state('down', 'down'))
      game_server.send('rotate_right');
    else if (rotation_keys_in_state('down', 'up'))
      game_server.send('rotate_stop');
    keyboard.left_key = 'up';
  };


  var on_right_arrow_down=function () {
    if (rotation_keys_in_state('up', 'up'))
      game_server.send('rotate_right');
    else if (rotation_keys_in_state('down', 'up'))
      game_server.send('rotate_stop');
    keyboard.right_key = 'down';
  };

  var on_right_arrow_up = function() {
    if (rotation_keys_in_state('down', 'down'))
      game_server.send('rotate_left');
    else if (rotation_keys_in_state('up', 'down'))
      game_server.send('rotate_stop');
    keyboard.right_key='up';
  };

}]);
