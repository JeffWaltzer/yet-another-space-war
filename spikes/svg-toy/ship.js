angular.module('svgToy', [])
    .controller('shipController', ['$scope', '$interval', function($scope, $interval) {
	var ship_points= [[100, 100],
			  [115, 125],
			  [100, 150],
			  [150, 125]];

	var jet_points= [[100, 115],
			 [110, 125],
			 [100, 135],
			 [80, 125]];

	var keys_down= [];
	var update_interval= 10.0; // ms
	var angular_accel= 0.5 * Math.PI / 180.0;  // radians / s^2
	var accel= 1.0;  // pixels / s^2
	var angular_accel_update = angular_accel * update_interval / 1000.0;
	var accel_update = accel * update_interval / 1000.0;
	// var universe_width= window.innerWidth;
	// var universe_height= window.innerHeight;
	var universe_width= 800;
	var universe_height= 600;

	ship_center_x= _.reduce(ship_points, function(sum_x, p) {return sum_x+p[0];}, 0) / _.size(ship_points);
	ship_center_y= _.reduce(ship_points, function(sum_y, p) {return sum_y+p[1];}, 0) / _.size(ship_points);
	ship_points=_.map(ship_points,
			  function(point) {return [point[0] - ship_center_x, point[1] - ship_center_y];});
	jet_points=_.map(jet_points,
			  function(point) {return [point[0] - ship_center_x, point[1] - ship_center_y];});


	var ship_state= {
  	    position: [universe_width/2, universe_height/2],
	    velocity: [0,0],
	    acceleration: [0,0],
	    heading: 0,
	    angular_velocity: 0,
	    angular_acceleration: 0
	};

	var is_key_down= function(keycode) {return function() {return keys_down[keycode];};};
	var arrow_left_down=  is_key_down(37);
	var arrow_up_down=  is_key_down(38);
	var arrow_right_down=  is_key_down(39);
	var arrow_down_down=  is_key_down(40);

	var modulo= function(value, max)
	{
	    value= value % max;
	    while (value < 0)
		value += max;
	    return value;
	};

	var update_ship= function() {
	    if (arrow_down_down()) {
		ship_state.angular_acceleration= 0;
		ship_state.angular_velocity= 0;
		ship_state.acceleration= [0, 0];
		ship_state.velocity= [0, 0];
		return;
	    }
	    
	    if (arrow_up_down())
		ship_state.acceleration= [accel_update*Math.cos(ship_state.heading),
					  accel_update*Math.sin(ship_state.heading)];
	    else
		ship_state.acceleration= [0, 0];

	    if (arrow_left_down() && !arrow_right_down())
		ship_state.angular_acceleration= angular_accel_update;
	    else if (arrow_right_down() && !arrow_left_down())
		ship_state.angular_acceleration= -angular_accel_update;
	    else
		ship_state.angular_acceleration= 0

	    ship_state.angular_velocity += ship_state.angular_acceleration;
	    ship_state.heading= modulo(ship_state.heading + ship_state.angular_velocity, 2*Math.PI);
	    ship_state.velocity= [ship_state.velocity[0] + ship_state.acceleration[0],
				  ship_state.velocity[1] + ship_state.acceleration[1]];
	    ship_state.position= [modulo(ship_state.position[0] + ship_state.velocity[0], universe_width),
				  modulo(ship_state.position[1] + ship_state.velocity[1], universe_height) ];
	}

	$scope.ship_accelerating= function() {
	    // DEBUG
	    // console.log(ship_state.acceleration[0],  ship_state.acceleration[1]);
	    // console.log(ship_state.acceleration[0] !== 0,  ship_state.acceleration[1] !== 0);
	    // console.log('---');
	    
	    var rv= ship_state.acceleration[0] !== 0  ||  ship_state.acceleration[1] !== 0;
	    // DEBUG
	    // console.log("ship_accelerating: returning: " + rv);
	    
	    return rv
	};
	
	$scope.onKeyDown= function(e) {
	    keys_down[e.keyCode]= true;
	};

	$scope.onKeyUp= function(e) {
	    keys_down[e.keyCode]= false;
	};

        $scope.svg_width= universe_width;
        $scope.svg_height= universe_height;
	$scope.ship_points_string= _.map(ship_points, function(value) {return value.join(',');}).join(' ');
	$scope.jet_points_string= _.map(jet_points, function(value) {return value.join(',');}).join(' ');
	$scope.ship_heading= function() {return -ship_state.heading * 180.0 / Math.PI;};
	$scope.ship_x= function() {return ship_state.position[0];};
	$scope.ship_y= function() {return universe_height - ship_state.position[1]};

        $interval(update_ship, update_interval);
    }]);
