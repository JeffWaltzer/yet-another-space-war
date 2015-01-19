module.exports = function(grunt) {
    grunt.initConfig({

            jasmine_node: {
                options: {
                    forceExit: true,
                    match: '.',
                    matchall: false,
                    extensions: 'js',
                    specNameMatcher: 'spec',
                    jUnit: {
                        report: true,
                        savePath: "./build/reports/jasmine/",
                        useDotNotation: true,
                        consolidate: true
                    }
                },
                all: ['spec/']
            },

            jshint: {
                all: ['src/**/*.js'],
                options: {
                    globals: {
                        _: false
                    },
                    browser: true,
                    devel: true
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.registerTask('default', ['jshint','jasmine_node']);
};
