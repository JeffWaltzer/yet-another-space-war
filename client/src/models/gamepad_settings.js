angular.module('YASW').factory('GamepadSettings', [
	function () {
		var service = {};

		var raw_button_bindings = {
			'default': {
				fire: [7],
				thrust: [9],
				left: [1],
				right: [2]
			},
			'DragonRise Inc.   Generic   USB  Joystick   (STANDARD GAMEPAD Vendor: 0079 Product: 0006)': {
				fire: [4, 5, 6, 7],
				thrust: [2, 13],
				left: [3, 14],
				right: [1, 15],
			},
			'THRUSTMASTER FireStorm Dual Power 2  (Vendor: 044f Product: b304)': {
				fire: [7],
				thrust: [9],
				left: [1],
				right: [2]
			},
			'Saitek PLC Cyborg Force Rumble Pad (Vendor: 06a3 Product: ff0c)': {
				fire: [6],
				thrust: [2],
				left: [1],
				right: [3]
			}
		};

		function make_bindings(raw_bindings) {
			var bindings = [];

			_(raw_bindings).each(function (button_numbers, command) {
				_(button_numbers).each(function (button_number) {
					bindings[button_number] = command;
				});
			});

			return bindings;
		}

		function invert_raw_bindings(raw_button_bindings) {
			var button_bindings = {};
			_(raw_button_bindings).each(function (raw_binding, id) {
				button_bindings[id] = make_bindings(raw_binding);
			});
			return button_bindings;
		}

		var button_bindings = invert_raw_bindings(raw_button_bindings);

		service.invert_raw_bindings = invert_raw_bindings;
		service.button_bindings = button_bindings;

		return service;
	}]);
