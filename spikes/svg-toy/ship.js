angular.module('svgToy', [])
    .controller('shipController', ['$scope', '$interval', function($scope, $interval) {
	var ship_points= [[100, 100],
			  [125, 85],
			  [150, 100],
			  [125, 50]];

	var left_down= false;
	var right_down= false;
	var update_interval= 20.0; // ms
	var angular_speed= 360.0;   // degrees / s
	var angular_update = angular_speed * update_interval / 1000.0;


	$scope.ship_angle= 0;
	$scope.ship_center_x= 125;
	$scope.ship_center_y= 83.3;

	var ship_angular_velocity= function() {
	    if (left_down && !right_down)
		return -angular_update;
	    if (right_down && !left_down)
		return angular_update;
	    return 0;
	};

	var rotate_ship= function() {
	    $scope.ship_angle= ($scope.ship_angle + ship_angular_velocity()) % 360;
	}

        $scope.svg_width= 800;
        $scope.svg_height= 600;

	$scope.ship_points_string= function() {
	    return _.map(ship_points,
			 function(value) { return value.join(); })
		.join(' ');
	};

	$scope.onKeyDown= function(e) {
	    if (e.keyCode === 37) {
		left_down= true;
	    }
	    else if (e.keyCode === 39) {
		right_down= true;
	    }
	};

	$scope.onKeyUp= function(e) {
	    if (e.keyCode === 37) {
		left_down= false;
	    }
	    else if (e.keyCode === 39) {
		right_down= false;
	    }
	};

        // $scope.center_x= 100;
        // $scope.center_y= 100;
        // $scope.radius= 10;

        $interval(rotate_ship, update_interval);
    }]);
