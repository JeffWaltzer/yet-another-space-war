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
        devel: true,
        reporterOutput: ""
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

    copy: {
      release: {
        files: [
          {expand: true, cwd: 'src',    src: ['**'],     dest: '../server/public', filter: 'isFile'},
          {expand: true, cwd: 'static', src: ['**'],     dest: '../server/public', filter: 'isFile'},
          {expand: true,                src: ['lib/**'], dest: '../server/public', filter: 'isFile'},
        ],
      },
    },



    clean: {
      coffee: {
        options: {force: true},
        src: ['spec/obj'],
      },
      release: {
        options: {force: true},
        src: ['../server/public'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('release', ['clean:release', 'copy:release']);
  grunt.registerTask('default', ['clean:coffee','coffee', 'jshint','karma']);
};
