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
            },

            deploy_client: {
              to: '../server/public',
              files: [],
            },
        }
    );
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['coffee', 'jshint','karma']);

    grunt.registerTask('deploy_client', function() {
      grunt.config.requires('deploy_client.to');
      grunt.config.requires('deploy_client.files');

      var to= grunt.config.get('deploy_client.to');
      var files= grunt.config.get('deploy_client.files');

      grunt.file.delete(to);
      files.forEach(function(file) {
        var destination= to + '/' + file;
        grunt.file.copy(file, destination);
      });
    });
};
