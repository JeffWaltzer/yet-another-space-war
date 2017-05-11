module.exports = function(config) {
    config.set({
            files: [
                'node_modules/engine.io-client/engine.io.js',
                'node_modules/angular/angular.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'lib/**/*.js',
                'src/yasw.js',
                'src/controllers/*.js',
                'src/models/*.js',
                'src/services/*.js',
                'spec/obj/*.js'
            ],
            frameworks: ['jasmine'],
            browsers: ['Chrome'],
            autoWatch: false,
            singleRun: true
        }
    );
};
