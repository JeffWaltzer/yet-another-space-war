module.exports = function(config) {
    config.set({
            files: [
                'node_modules/angular/angular.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'lib/**/*.js',
                'src/svg.js',
                'src/ship_command_controller.js',
                'spec/**/*.js'
            ],
            frameworks: ['jasmine'],
            browsers: ['PhantomJS'],
            autoWatch: false,
            singleRun: true
        }
    );
};
