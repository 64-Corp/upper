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
        jsdox: {
            generate: {
                options: {
                    contentsEnabled: true,
                    contentsTitle: 'Upper',
                    contentsFile: 'readme.md'
                },
                src: ['lib/**/**/*.js', 'test/server/**/*.js', 'test/client/**/*.js'],
                dest: 'docs'
            }
        },
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
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */ \n \n (function () { \n',
                footer: '\n })();\n',
                stripHeaders: true
            },
            dist: {
                src: ['lib/static/dev/core.js', 'lib/static/dev/browser.js'],
                dest: 'lib/static/dev/temp.js'
            },
            angular: {
                src: ['lib/static/dev/core.js', 'lib/static/dev/ng-upper.js'],
                dest: 'lib/static/dev/ng-temp.js'
            },
        },
        browserify: {
            dist: {
                files: {
                    'lib/static/dist/upper.js': ['lib/static/dev/temp.js'],
                    'lib/static/dist/ng-upper.js': ['lib/static/dev/ng-temp.js']
                },
                options: {
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'lib/static/dist/upper.min.js': ['lib/static/dist/upper.js'],
                    'lib/static/dist/ng-upper.min.js': ['lib/static/dist/ng-upper.js']
                }
            }
        },
        clean: {
            build: {
                src: ["lib/static/dev/temp.js", "lib/static/dev/ng-temp.js"]
            }
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
        // protractor: {
        //     options: {
        //         configFile: "test/e2e/e2e.conf.js",
        //             keepAlive: false,
        //             noColor: false,
        //         args: {
        //         }
        //     },
        //     your_target: {
        //         options: {
        //             // configFile: "e2e.conf.js", // Target-specific config file
        //             // args: {} // Target-specific arguments
        //         }
        //     },
        // },
        // Distribution
        mkdir: {
            dist: {
                options: {
                    create: ['dist', './dist']
                },
            },
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['index.js', 'package.json', 'README.md', 'lib/**/**/**/**/*.js'],
                        dest: 'dist'
                    }
                ]
            }
        }
    });

    // npm modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdox');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-mocha-selenium');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // tasks
    grunt.registerTask('build', ['concat:dist', 'concat:angular', 'browserify', 'uglify', 'clean']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test:frontend', ['express']);
    grunt.registerTask('test:e2e', ['express']);
    grunt.registerTask('test:backend', ['mochaTest']);
    grunt.registerTask('test', ['test:backend']);
    grunt.registerTask('example', ['shell:express']);
    grunt.registerTask('dist', ['mkdir:dist', 'copy:dist']);
    grunt.registerTask('default', ['build', 'test', 'lint', 'dist']);
};
