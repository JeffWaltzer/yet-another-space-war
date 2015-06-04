angular.module('YASW').controller('ShipCommandController', function($scope, game_server) {
  var KEY_LEFT_ARROW= 37;
  var KEY_RIGHT_ARROW= 39;
  var KEY_DOWN_ARROW= 40;
  var KEY_SPACE= 32;

  $scope.ships= function() { return game_server.ships; };

  game_server.on_message= function(raw_data) {
    game_server.update_ship_outlines(JSON.parse(raw_data));
    $scope.$digest();
  };
  game_server.web_socket.on('message', game_server.on_message);

  $scope.left_key= 'up';
  $scope.right_key= 'up';
  $scope.down_key= 'up';
  $scope.fire_key= 'up';

  var key_handlers= {};

  function add_simple_key_handler(keycode, key_name, down_event, up_event) {
    var key_in_state= function(state) { return $scope[key_name + '_key'] === state; };

    key_handlers[keycode]= {
      up: function() {
	if (key_in_state('down') && up_event !== null)
	  game_server.send(up_event);
	$scope[key_name + '_key']= 'up';
      },
      down: function() {
	if (key_in_state('up') && down_event !== null)
	  game_server.send(down_event);
	$scope[key_name + '_key']= 'down';
      }
    };
  }

  function add_opposition_key_pair_handler(left_keycode, left_key_name, right_keycode, right_key_name,
					   left_down_event, left_up_event, right_down_event, right_up_event) {

    var left_key_in_state= function(state) { return $scope[left_key_name + '_key'] === state; };
    var right_key_in_state= function(state) { return $scope[right_key_name + '_key'] === state; };
    var keys_in_state= function(left, right) { return left_key_in_state(left) && right_key_in_state(right); };

    key_handlers[left_keycode]= {
      up: function() {
	if (keys_in_state('down', 'down'))
	  game_server.send('rotate_right');
	else if (keys_in_state('down', 'up'))
	  game_server.send('rotate_stop');
	$scope.left_key = 'up';
      },
      down: function() {
	if (keys_in_state('up', 'up'))
	  game_server.send('rotate_left');
	else if (keys_in_state('up', 'down'))
	  game_server.send('rotate_stop');
	$scope.left_key='down';
      }
    };

    key_handlers[right_keycode]= {
      up: function() {
	if (keys_in_state('down', 'down'))
	  game_server.send('rotate_left');
	else if (keys_in_state('up', 'down'))
	  game_server.send('rotate_stop');
	$scope.right_key='up';
      },
      down: function() {
	if (keys_in_state('up', 'up'))
	  game_server.send('rotate_right');
	else if (keys_in_state('down', 'up'))
	  game_server.send('rotate_stop');
	$scope.right_key = 'down';
      }
    };
  }

  add_simple_key_handler(KEY_SPACE, 'fire', 'fire', null);
  add_opposition_key_pair_handler(KEY_LEFT_ARROW, 'left', KEY_RIGHT_ARROW, 'right',
				  'rotate_left', 'rotate_stop', 'rotate_right', 'rotate_stop');

  function handler_for(key_code) {
    var handler= key_handlers[key_code];
    if (typeof(handler) === 'undefined')
      handler= {
	up: function() {},
	down: function() {}
      };
    return handler;
  }

  $scope.onKeyDown= function(e) { handler_for(e.keyCode).down(e); };
  $scope.onKeyUp= function(e) { handler_for(e.keyCode).up(e); };

});
  
