/**
 * `grunt test`      -     run tests
 * `grunt lint`      -     lint front and backend
 * `grunt docs`      -     create docs
 * `grunt validate`  -     check everything is how it should be before making a pull request a main branch
 */

module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                node : true,        // node variables
                browser : true,     // browser variables
                curly: true,        // disallow functions without curly braces
                eqeqeq: true,       // === and  !== instead of == and !=
                strict: true,       // have to enable strict mode
                undef: true,        // disallow globally defined variables
                noarg: true,        // prevents depreciated javascript functions
                loopfunc: true,     // disallow functions inside loops
                immed: true,        // disallow immediate functions, they need ()
                indent: 4,          // force tab indentation to be set to 4
                quotmark: 'single', // force use of single quotation marks
                camelcase: true,    // forces camel case - note this needs to be ignored when using json apis
                unused: true,       // disallows unused variables
                eqnull: true,       // allow variable comparison with null or undefined
                laxcomma: true,     // allow commas before variables or keys
                '-W018': true,      // Ignore `confusing use of ..` - this stops warning for `!!`
                globals: {
                },
                ignores: ['example/client/public/bower_components/**/**/**/**/**/*.js', 'lib/static/dev/*.js', 'lib/static/dist/*.js'],
                reporter: require('jshint-stylish')
            },
            uses_defaults: ['lib/**/**/*.js', 'example/**/**/**/*.js']
        },
        express: {
            options: {
            },
            test: {
                options: {
                    script: 'test/resources/server.js',
                    spawn: false
                }
            }
        },
        shell: {
            express: {
                options: {
                    port: 9000
                },
                command: 'node test/resources/server.js'
            }
        },

        // server tests
        mochaTest: {
            lib: {
                options: {
                    reporter: 'spec',
                    growl: true,
                    colors: true
                },
                src: ['test/server/**/**/*Spec.js', 'test/common.js']
            }
        },

        // frontent tests
    	karma: {
			wercker: {
				configFile: 'test/client/karma.conf.js',
                singleRun: true,
				browsers: ['PhantomJS']
			},
			'user-osx': {
				configFile: 'test/client/karma.conf.js',
				singleRun: true,
				logLevel: 'ERROR',

				// test on all browsers avaliable for osx
				browsers: ['Chrome', 'PhantomJS', 'Firefox', 'Safari'],
			},
			'user-win': {
				configFile: 'test/client/karma.conf.js',
				singleRun: true,
				logLevel: 'ERROR',

				// test on all browsers avaliable for windows
				browsers: ['Chrome', 'PhantomJS', 'Firefox', 'IE'],
			},
			'user-linux': {
				configFile: 'test/client/karma.conf.js',
				singleRun: true,
				logLevel: 'ERROR',

				// test on all browsers avaliable for linux
				browsers: ['Chrome', 'PhantomJS', 'Firefox', 'Opera'],
			}
		},

        // e2e tests
        nightwatch: {
            options: {
                standalone: true,
                jar_path: 'node_modules/selenium-standalone/.selenium/2.42.0/server.jar',
                src_folders: ['test/e2e/specs'],
                output_folder: 'test/e2e/report',
                test_settings: {},
                settings: {},
                selenium: {}
            }
        }
    });

	// Run specific tests depending on OS
	if (process.platform === 'win32') {
		// windows
		grunt.registerTask('test:frontend', ['karma:user-win']);
	} else if(process.platform === 'darwin') {
		// os
		grunt.registerTask('test:frontend', ['karma:user-osx']);
	} else {
		// linux
		grunt.registerTask('test:frontend', ['karma:user-linux']);
	}

    // npm modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nightwatch');
    grunt.loadNpmTasks('grunt-karma');

    // tasks
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test:e2e', ['express', 'nightwatch']);
    grunt.registerTask('test:backend', ['mochaTest']);
    grunt.registerTask('test', ['test:backend', 'test:e2e', 'nightwatch']);
    grunt.registerTask('example', ['shell:express']);
    grunt.registerTask('default', ['build', 'test', 'lint', 'dist']);

    // to be run by wercker for testing --- 'karma:wercker' needs to be added when passing
    grunt.registerTask('test:wercker', ['test:backend']);
};
