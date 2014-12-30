module.exports = function(grunt) {
    grunt.initConfig({
            jshint: {
                all: ['src/**/*.js'],
                options: {
                    globals: {
                        _: false,
                        $: false
                    },
                    browser: true,
                    devel: true
                }
            },

            karma: {
                unit: {
                    configFile: 'karma.conf.js'
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma']);


};
