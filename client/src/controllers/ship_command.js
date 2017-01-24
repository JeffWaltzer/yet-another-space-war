angular.module('YASW').controller('ShipCommandController', ['$scope', 'game_server', 'keyboard', 'gamepad_service', function ($scope, game_server, keyboard, gamepad_service) {
  $scope.screen_objects = function () {
    return game_server.screen_objects;
  };

  game_server.on_message = function (raw_data) {
    var message = JSON.parse(raw_data);
    game_server.update_ship_outlines(message.screen_objects, message.you);
    $scope.field_size = message.field_size;
    $scope.$digest();
  };
  game_server.web_socket.on('message', game_server.on_message);

  var KEY_LEFT_ARROW = 37;
  var KEY_RIGHT_ARROW = 39;
  var KEY_DOWN_ARROW = 40;
  var KEY_SPACE = 32;
  var KEY_R = 82;

  setInterval(function () {
    var the_gamepads = _(navigator.getGamepads()).compact();
    if (the_gamepads.length > 0) {
      // DEBUG
      console.log(_(the_gamepads[0].buttons).map(function(button, index) {
        return "" + index + " " + button.pressed;
      }));

      gamepad_service.interpret_command(
          new gamepad_service.YaswGamepad(the_gamepads[0])
      );
    }
  }, 50);


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
      case KEY_R:
        keyboard.on_clone_down();
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
    }
  };

}]);
