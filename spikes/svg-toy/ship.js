angular.module('svgToy', [])
    .controller('shipController', ['$scope', '$interval', function($scope, $interval) {
	var ship_points= [[100, 100],
			  [125, 85],
			  [150, 100],
			  [125, 50]];
	var keys_down= [];
	var update_interval= 10.0; // ms
	var angular_speed= 180.0;  // degrees / s
	var angular_update = angular_speed * update_interval / 1000.0;

	var is_key_down= function(keycode) {return function() {return keys_down[keycode];};};
	var left_down=  is_key_down(37);
	var right_down=  is_key_down(39);

	var ship_angular_velocity= function() {
	    if (left_down() && !right_down())
		return -angular_update;
	    if (right_down() && !left_down())
		return angular_update;
	    return 0;
	};

	var update_ship= function() {
	    $scope.ship_angle= ($scope.ship_angle + ship_angular_velocity()) % 360;
	}

	$scope.onKeyDown= function(e) {
	    keys_down[e.keyCode]= true;
	};

	$scope.onKeyUp= function(e) {
	    keys_down[e.keyCode]= false;
	};

	$scope.ship_angle= 0;
        $scope.svg_width= 800;
        $scope.svg_height= 600;
	$scope.ship_center_x= _.reduce(ship_points, function(sum_x, p) {return sum_x+p[0];}, 0) / _.size(ship_points);
	$scope.ship_center_y= _.reduce(ship_points, function(sum_y, p) {return sum_y+p[1];}, 0) / _.size(ship_points);
	$scope.ship_points_string= _.map(ship_points, function(value) {return value.join(',');}).join(' ');

        $interval(update_ship, update_interval);
    }]);
