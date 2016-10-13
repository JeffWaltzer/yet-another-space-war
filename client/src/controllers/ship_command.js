angular.module('YASW').controller('ShipCommandController', function($scope, $window,  game_server) {
  var key_in_state= function(key, state) { return $scope[key + '_key'] === state; };
  var rotation_keys_in_state= function(left, right) {
    return key_in_state('left', left) && key_in_state('right', right);
  };

  var KEY_LEFT_ARROW= 37;
  var KEY_RIGHT_ARROW= 39;
  var KEY_DOWN_ARROW= 40;
  var KEY_SPACE= 32;
  var KEY_R= 82;

  $scope.screen_objects= function() { return game_server.screen_objects; };

  game_server.on_message= function(raw_data) {
    var message= JSON.parse(raw_data);
    game_server.update_ship_outlines(message.screen_objects, message.you);
    $scope.field_size= message.field_size;
    $scope.$digest();
  };
  game_server.web_socket.on('message', game_server.on_message);

  $scope.left_key= 'up';
  $scope.right_key= 'up';
  $scope.thrust_key= 'up';
  $scope.fire_key= 'up';

  setInterval(function () {
    var gamePads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    // _(gamePads).each(function (pad) {
    //   console.log(pad);
    // });
    console.log(gamePads);
  }, 1000);


  $window.addEventListener('gamepaddisconnected', function (event) {
    console.log('gamepaddisconnected', event.gamepad.index);
  });

  $scope.onKeyDown= function(e) {
    switch (e.keyCode) {
    case KEY_LEFT_ARROW:
      on_left_arrow_down();
      break;
    case KEY_RIGHT_ARROW:
      on_right_arrow_down();
      break;
    case KEY_DOWN_ARROW:
      on_down_arrow_down();
      break;
    case KEY_SPACE:
      on_fire_down();
      break;
    case KEY_R:
      on_clone_down();
      break;
    }
  };


  $scope.onKeyUp= function(e) {
    switch (e.keyCode) {
    case KEY_LEFT_ARROW:
      on_left_arrow_up();
      break;
    case KEY_RIGHT_ARROW:
      on_right_arrow_up();
      break;
    case KEY_DOWN_ARROW:
      on_down_arrow_up();
      break;
    case KEY_SPACE:
      on_fire_up();
      break;
    }
  };

//--------------------------------------------------------------

  var on_fire_down= function() {
    if (key_in_state('fire', 'up'))
      game_server.send('fire');
    $scope.fire_key= 'down';
  };

  var on_fire_up= function() {
    $scope.fire_key= 'up';
  };

  var on_down_arrow_down = function() {
    if (key_in_state('thrust', 'up'))
      game_server.send('thrust_on');
    $scope.thrust_key = 'down';
  };

  var on_down_arrow_up = function() {
    if (key_in_state('thrust', 'down'))
      game_server.send('thrust_off');
    $scope.thrust_key = 'up';
  };


  var on_left_arrow_down= function() {
    if (rotation_keys_in_state('up', 'up'))
      game_server.send('rotate_left');
    else if (rotation_keys_in_state('up', 'down'))
      game_server.send('rotate_stop');
    $scope.left_key='down';
  };

  var on_left_arrow_up = function() {
    if (rotation_keys_in_state('down', 'down'))
      game_server.send('rotate_right');
    else if (rotation_keys_in_state('down', 'up'))
      game_server.send('rotate_stop');
    $scope.left_key = 'up';
  };


  var on_right_arrow_down=function () {
    if (rotation_keys_in_state('up', 'up'))
      game_server.send('rotate_right');
    else if (rotation_keys_in_state('down', 'up'))
      game_server.send('rotate_stop');
    $scope.right_key = 'down';
  };

  var on_right_arrow_up = function() {
    if (rotation_keys_in_state('down', 'down'))
      game_server.send('rotate_left');
    else if (rotation_keys_in_state('up', 'down'))
      game_server.send('rotate_stop');
    $scope.right_key='up';
  };

  var on_clone_down= function() {
    game_server.send('clone');
  };
});
