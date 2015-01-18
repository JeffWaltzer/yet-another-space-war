describe('ShipCommandController', function() {

    beforeEach(module('YASW'));

    var scope, $location, createController, game_server;
    beforeEach(inject(function($rootScope, $controller, _$location_, _game_server_) {
        $location = _$location_;
        scope = $rootScope.$new();
        createController = function() {
            return $controller('ShipCommandController', {'$scope': scope});
        };
        game_server= _game_server_;
    }));

    describe('Initial key states', function() {
        var controller;

        beforeEach(function(){
            controller= createController();
        });

        it('start left up', function() {
            expect(scope.left_key).toBe('up');
        })
        it('start right up', function() {
            expect(scope.right_key).toBe('up');
        })
    })

    var sent_tests=  [
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
                scope.left_key= test_conditions.left_key;
                spyOn(game_server, 'send');
            });

            describe(' and right key is ' + test_conditions.right_key, function() {
                beforeEach(function(){
                    scope.right_key= test_conditions.right_key;
                });

                describe(' and we receive ' + test_conditions.event, function(){
                    beforeEach(function(){
                        scope.onKeyEvent(test_conditions.event);
                    });

                    if(test_conditions.expected_sent){
                      it('sends ' + test_conditions.expected_sent , function() {
                          expect(game_server.send).toHaveBeenCalledWith(test_conditions.expected_sent);
                      })
                    }   else {
                        it('does not send' , function() {
                            expect(game_server.send).not.toHaveBeenCalled();
                        })
                    }
                })
            })
        } );
    });

    var state_tests = [
        {left_key: 'up', right_key: 'up', event: 'left_down', expected_left_key_state: 'down', expected_right_key_state: 'up' },
        {left_key: 'up', right_key: 'up', event: 'left_up', expected_left_key_state: 'up', expected_right_key_state: 'up' },
        {left_key: 'up', right_key: 'up', event: 'right_down', expected_left_key_state: 'up', expected_right_key_state: 'down' },
        {left_key: 'up', right_key: 'up', event: 'right_up', expected_left_key_state: 'up', expected_right_key_state: 'up' },
        {left_key: 'up', right_key: 'down', event: 'left_down', expected_left_key_state: 'down', expected_right_key_state: 'down' },
        {left_key: 'up', right_key: 'down', event: 'left_up', expected_left_key_state: 'up', expected_right_key_state: 'down' },
        {left_key: 'up', right_key: 'down', event: 'right_down', expected_left_key_state: 'up', expected_right_key_state: 'down' },
        {left_key: 'up', right_key: 'down', event: 'right_up', expected_left_key_state: 'up', expected_right_key_state: 'up' },
        {left_key: 'down', right_key: 'up', event: 'left_down', expected_left_key_state: 'down', expected_right_key_state: 'up' },
        {left_key: 'down', right_key: 'up', event: 'left_up', expected_left_key_state: 'up', expected_right_key_state: 'up' },
        {left_key: 'down', right_key: 'up', event: 'right_down', expected_left_key_state: 'down', expected_right_key_state: 'down' },
        {left_key: 'down', right_key: 'up', event: 'right_up', expected_left_key_state: 'down', expected_right_key_state: 'up' },
        {left_key: 'down', right_key: 'down', event: 'left_down', expected_left_key_state: 'down', expected_right_key_state: 'down' },
        {left_key: 'down', right_key: 'down', event: 'left_up', expected_left_key_state: 'up', expected_right_key_state: 'down' },
        {left_key: 'down', right_key: 'down', event: 'right_down', expected_left_key_state: 'down', expected_right_key_state: 'down' },
        {left_key: 'down', right_key: 'down', event: 'right_up', expected_left_key_state: 'down', expected_right_key_state: 'up' }
    ];
    _.each(state_tests, function(test_conditions) {
        describe( 'When left key is ' + test_conditions.left_key, function() {
            var controller;

            beforeEach(function(){
                controller= createController();
                scope.left_key= test_conditions.left_key;
            });

            describe(' and right key is ' + test_conditions.right_key, function() {
                beforeEach(function(){
                    scope.right_key= test_conditions.right_key;
                });

                describe(' and we receive ' + test_conditions.event, function(){
                    beforeEach(function(){
                        scope.onKeyEvent(test_conditions.event);
                    });
                    it('right key is ' + test_conditions.expected_right_key_state , function() {
                        expect(scope.right_key).toEqual(test_conditions.expected_right_key_state);
                    })
                    it('left key is ' + test_conditions.expected_left_key_state , function() {
                        expect(scope.left_key).toEqual(test_conditions.expected_left_key_state);
                    })
                })
            })
        } )
    });

});
