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

  var key_handlers= {};

  function send_event(e) {
    if (e !== null)
      game_server.send(e);
  }

  function add_simple_key_handler(keycode, key_name, down_event, up_event) {
    var key_in_state= function(state) { return $scope[key_name] === state; };

    $scope[key_name]= 'up';

    key_handlers[keycode]= {
      up: function() {
	if (key_in_state('down'))
	  send_event(up_event);
	$scope[key_name]= 'up';
      },
      down: function() {
	if (key_in_state('up'))
	  send_event(down_event);
	$scope[key_name]= 'down';
      }
    };
  }

  function add_opposition_key_pair_handler(left_keycode, left_key_name, left_down_event, left_up_event,
					   right_keycode, right_key_name, right_down_event, right_up_event) {

    var left_key_in_state= function(state) { return $scope[left_key_name] === state; };
    var right_key_in_state= function(state) { return $scope[right_key_name] === state; };
    var keys_in_state= function(left_state, right_state) { return left_key_in_state(left_state) && right_key_in_state(right_state); };

    $scope[left_key_name]= 'up';
    $scope[right_key_name]= 'up';

    key_handlers[left_keycode]= {
      up: function() {
	if (keys_in_state('down', 'down'))
	  send_event(right_down_event);
	else if (keys_in_state('down', 'up'))
	  send_event(left_up_event);
	$scope[left_key_name] = 'up';
      },
      down: function() {
	if (keys_in_state('up', 'up'))
	  send_event(left_down_event);
	else if (keys_in_state('up', 'down'))
	  send_event(right_up_event);
	$scope[left_key_name]='down';
      }
    };

    key_handlers[right_keycode]= {
      up: function() {
	if (keys_in_state('down', 'down'))
	  send_event(left_down_event);
	else if (keys_in_state('up', 'down'))
	  send_event(right_up_event);
	$scope[right_key_name]='up';
      },
      down: function() {
	if (keys_in_state('up', 'up'))
	  send_event(right_down_event);
	else if (keys_in_state('down', 'up'))
	  send_event(left_up_event);
	$scope[right_key_name] = 'down';
      }
    };
  }

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

  add_simple_key_handler(         KEY_SPACE,       'fire_key',   'fire',         null);
  add_simple_key_handler(         KEY_DOWN_ARROW,  'thrust_key', 'thrust_on',    'thrust_off');
  add_opposition_key_pair_handler(KEY_LEFT_ARROW,  'left_key',   'rotate_left',  'rotate_stop',
				  KEY_RIGHT_ARROW, 'right_key',  'rotate_right', 'rotate_stop');
});
