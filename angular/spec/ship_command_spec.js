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

    sent_tests=  [
        {left_key: 'up',   right_key: 'up',   event: 'left_down',  expected_sent: 'rotate_left'},
        {left_key: 'down', right_key: 'down', event: 'right_up',   expected_sent: 'rotate_left'},

        {left_key: 'up',   right_key: 'up',   event: 'right_down', expected_sent: 'rotate_right'},
        {left_key: 'down', right_key: 'down', event: 'left_up',    expected_sent: 'rotate_right'},

        {left_key: 'up',   right_key: 'down', event: 'left_down',  expected_sent: 'rotate_stop'},
        {left_key: 'up',   right_key: 'down', event: 'right_up',   expected_sent: 'rotate_stop'},
        {left_key: 'down', right_key: 'up',   event: 'left_up',    expected_sent: 'rotate_stop'},
        {left_key: 'down', right_key: 'up',   event: 'right_down', expected_sent: 'rotate_stop'},

        {left_key: 'up',   right_key: 'up',   event: 'left_up',    expected_sent: null},
        {left_key: 'up',   right_key: 'down', event: 'left_up',    expected_sent: null},
        {left_key: 'up',   right_key: 'up',   event: 'right_up',   expected_sent: null},
        {left_key: 'up',   right_key: 'down', event: 'right_down', expected_sent: null},

        {left_key: 'down', right_key: 'up',   event: 'left_down',  expected_sent: null},
        {left_key: 'down', right_key: 'down', event: 'left_down',  expected_sent: null},
        {left_key: 'down', right_key: 'up',   event: 'right_up',   expected_sent: null},
        {left_key: 'down', right_key: 'down', event: 'right_down', expected_sent: null}

    ];

    _.each(sent_tests, function(test_conditions) {
        describe( 'When left key is ' + test_conditions.left_key, function() {
            var controller;

            beforeEach(function(){
                controller= createController();
                controller.left_key= test_conditions.left_key;
                spyOn(server, 'send');
            });

            describe(' and right key is ' + test_conditions.right_key, function() {
                beforeEach(function(){
                    controller.right_key= test_conditions.right_key;
                });

                describe(' and we receive ' + test_conditions.event, function(){
                    beforeEach(function(){
                        controller.onKeyEvent(test_conditions.event);
                    });

                    if(test_conditions.expected_sent){
                      it('sends ' + test_conditions.expected_sent , function() {
                          expect(server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
                      })
                    }   else {
                        it('does not send' , function() {
                            expect(server.send).not.toHaveBeenCalled();
                        })
                    }
                })
            })
        } );
    });

//    state_tests= [{left_key: up, right_key: up, event: left_down, expected_left_key_state: down, expected_right_key_state: up}]

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
