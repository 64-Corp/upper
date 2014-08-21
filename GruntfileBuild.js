/**
 * @desc Gruntfile to build dist when running npm install
 */
module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // tasks
    grunt.registerTask('build', ['concat:dist', 'concat:angular', 'browserify', 'uglify', 'clean']);
    grunt.registerTask('default', ['build']);
};
