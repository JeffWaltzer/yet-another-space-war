module.exports = function(grunt) {
  grunt.initConfig({

    jasmine_node: {
      useHelpers: true,
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        jUnit: {
          report: false,
          savePath: "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
      all: {specNameMatcher: 'spec/obj/*_spec.js'},
      quick: {specNamMatcher: 'spec/obj/vector_spec.js'}
    },

    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: "spec",
        src: ['**/*.coffee'],
        dest: 'spec/obj',
        ext: '.js'
      }
    },

    jshint: {
      all: ['src/**/*.js'],
      options: {
        // globals: {
        //   _: false
        // },
        browser: true,
        devel: true,
        reporterOutput: ""
      }
    },

    clean: {
      release: {
        options: {force: true},
        src: ['public']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('clean', function() {
    grunt.file.expand('spec/obj/*').forEach(function(file) {
      grunt.file.delete(file);
    });
  });

  grunt.registerTask('default', ['clean', 'coffee', 'jshint', 'jasmine_node:all']);
  grunt.registerTask('quick',   ['clean', 'coffee', 'jshint', 'jasmine_node:quick']);
};
