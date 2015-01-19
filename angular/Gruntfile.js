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

            coffee: {
                compile: {
                    files: {
                        'spec/obj/ship_command_spec.js': 'spec/ship_command_spec.coffee',
                        'spec/obj/polygon_spec.js': 'spec/polygon_spec.coffee'
                    },
                },
            },

            karma: {
                unit: {
                    configFile: 'karma.conf.js'
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['coffee', 'karma']);


};
