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
                glob_to_multiple: {
                    expand: true,
                    flatten: true,
                    cwd: "spec",
                    src: ['*.coffee'],
                    dest: 'spec/obj',
                    ext: '.js'
                }
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

    grunt.registerTask('default', ['coffee', 'jshint','karma']);


};
