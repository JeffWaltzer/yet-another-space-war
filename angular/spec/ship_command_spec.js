describe('ShipCommandController', function() {

    beforeEach(module('YASW'));

    var scope, $location, createController;
    beforeEach(inject(function($rootScope, $controller, _$location_) {
        $location = _$location_;
        scope = $rootScope.$new();
        createController = function() {
            return $controller('ShipCommandController', {'$scope': scope});
        };
    }));

//    state_tests= [{left_key: up, right_key: up, event: left_down, expected_left_key_state: down, expected_right_key_state: up}]
//    sent_tests=  [{left_key: up, right_key: up, event: left_down, expected_sent: something}]

    describe("left key is up and right key is up", function() {
        describe ("receives a left key down", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
        describe ("receives a right key down", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
    });

    describe("left key is up and right key is down", function() {
        describe ("receives a left key down", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
        describe ("receives a right key up", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
        describe ("receives a right key down", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
    });

    describe("left key is down and right key is up", function() {
        describe ("receives a left key up", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
        describe ("receives a left key down", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
        describe ("receives a right key down", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
    });

    describe("left key is down and right key is down", function() {
        describe ("receives a left key up", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
        describe ("receives a left key down", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
        describe ("receives a right key up", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
        describe ("receives a right key down", function() {
            xit('is in the correct state', function() {});
            xit('sends the correct thing to the server', function() {});
        });
    });
});
