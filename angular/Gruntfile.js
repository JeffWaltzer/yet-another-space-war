module.exports = function(grunt) {
    grunt.initConfig({

        jshint: {
            all: ['source/**/*.js'],
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
		options: {
		    files: ['src/**/*.js', 'spec/**/*.js'],
		    frameworks: ['jasmine'],
		    browsers: ['PhantomJS'],
		    autoWatch: false,
		    singleRun: true
		}
	    }
	}
    }
		    );
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
};
