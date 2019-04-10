module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            selectinput: {
                src: [
                    'build/selectinput.js'
                ],
                dest: 'src/js/selectinput.js'
            },
        },
        uglify: {
            selectinput: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'src/js/selectinput.js.map'
                },
                files: {
                    'src/js/selectinput.min.js': ['build/selectinput.js']
                }
            },
        },
        sass: {
            style: {
                files: {
                    'src/css/selectinput.css': ['build/selectinput.scss']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 11']
            },
            dist: {
                files: {
                    'src/css/selectinput.css': ['src/css/selectinput.css']
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'src/css/selectinput.min.css': ['src/css/selectinput.css']
                }
            }
        },
        watch: {
            scripts: {
                files: ['build/selectinput.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                },
            },
            styles: {
                files: ['build/selectinput.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load npm packages
    // npm install grunt-contrib-concat grunt-contrib-uglify-es grunt-contrib-sass grunt-autoprefixer grunt-css grunt-contrib-cssmin grunt-contrib-watch
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Grunt task`s
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'watch']);
};