module.exports = function(config) {
    config.set({
            files: [
                'node_modules/angular/angular.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'lib/**/*.js',
                'src/yasw.js',
                'src/ship_command_controller.js',
                'src/game_server_service.js',
                'spec/**/*.js'
            ],
            frameworks: ['jasmine'],
            browsers: ['PhantomJS'],
            autoWatch: false,
            singleRun: true
        }
    );
};
