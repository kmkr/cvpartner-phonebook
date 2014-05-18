module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'karma:unit']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src: {
            js: ['src/**/*.js'],
            specs: ['test/**/*.spec.js']
        },
        karma: {
            watch: {
                configFile: 'test/unit/unit.config.js'
            },
            unit: {
                configFile: 'test/unit/unit.config.js',
                singleRun: true,
                autoWatch: false
            }
        },
        watch: {
            all: {
                files: [
                    '<%= src.js %>',
                    '<%= src.specs %>'
                ],
                tasks: ['jshint', 'karma:watch']
            }
        },
        jshint: {
            files: [
                'gruntFile.js',
                '<%= src.js %>',
                '<%= src.specs %>'
            ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globals: {}
            }
        },
        clean: {
            cordova: {
                force: true,
                files: [{
                    dist: '<%= pkg.path %>',
                }],
            }
        },
        copy: {
            cordova: {
                options:  {
                    process: function(content, path) {
                        if ('src/js/config.js' === path) {
                            //When running in an emulator, host will be different
                            return content.replace('localhost', '10.0.2.2');
                        } else {
                            return content;
                        }
                    }
                },
                files: [{
                    expand: true,
                    src: ['**'],
                    dest: '<%= pkg.path %>/www/',
                    cwd: 'src/'
                }]
            }
        },
        cordovacli: {
            options: {
                path: '<%= pkg.path %>'
            },
            cordova: {
                options: {
                    command: ['create', 'platform', 'plugin', 'build'],
                    platforms: ['android'],
                    plugins: ['device', 'dialogs'],
                    path: '<%= pkg.path %>',
                    id: '<%= pkg.id %>',
                    name: '<%= pkg.name %>'
                }
            },
            create: {
                options: {
                    command: 'create',
                    id: '<%= pkg.id %>',
                    name: '<%= pkg.name %>'
                }
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['android']
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'battery-status',
                        'camera',
                        'console',
                        'contacts',
                        'device',
                        'device-motion',
                        'device-orientation',
                        'dialogs',
                        'file',
                        'geolocation',
                        'globalization',
                        'inappbrowser',
                        'media',
                        'media-capture',
                        'network-information',
                        'splashscreen',
                        'vibration'
                    ]
                }
            },
            build_android: {
                options: {
                    command: 'build',
                    platforms: ['android']
                }
            },
        }

    });

    grunt.registerTask('dist', ['clean:cordova', 'cordovacli:cordova', 'copy:cordova']);
};
