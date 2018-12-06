angular.module('YASW').controller('ShipCommandController', ['$scope', 'game_server', 'keyboard', 'Gamepad',
  function ($scope, game_server, keyboard, Gamepad) {

  $scope.gamepad_editor_visible= false;

  $scope.polygons = function () {
    return game_server.polygons;
  };

  game_server.on_message = function (raw_data) {
    var message = JSON.parse(raw_data);
    game_server.update_ship_wireframes(message.polygons);
    $scope.field_size = message.field_size;
    $scope.$digest();
  };
  game_server.web_socket.on('message', game_server.on_message);

  var KEY_LEFT_ARROW = 37;
  var KEY_RIGHT_ARROW = 39;
  var KEY_DOWN_ARROW = 40;
  var KEY_SPACE = 32;
  var KEY_G= 71;
  var KEY_S = 83;

  $scope.onKeyDown = function (e) {
    switch (e.keyCode) {
      case KEY_LEFT_ARROW:
        keyboard.on_left_arrow_down();
        break;
      case KEY_RIGHT_ARROW:
        keyboard.on_right_arrow_down();
        break;
      case KEY_DOWN_ARROW:
        keyboard.on_down_arrow_down();
        break;
      case KEY_SPACE:
        keyboard.on_fire_down();
        break;
      case KEY_S:
        keyboard.on_clone_down();
        break;
      case KEY_G:
          $scope.gamepads = _.compact( Gamepad.dom_gamepads());
          keyboard.on_gamepad_editor_hotkey_down($scope);
        break;
    }
  };

  $scope.onKeyUp = function (e) {
    switch (e.keyCode) {
      case KEY_LEFT_ARROW:
        keyboard.on_left_arrow_up();
        break;
      case KEY_RIGHT_ARROW:
        keyboard.on_right_arrow_up();
        break;
      case KEY_DOWN_ARROW:
        keyboard.on_down_arrow_up();
        break;
      case KEY_SPACE:
        keyboard.on_fire_up();
        break;
      case KEY_G:
        keyboard.on_gamepad_editor_hotkey_up();
      break;
    }
  };

}]);
