module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint', 'karma:unit']);

    grunt.initConfig({
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
        }
    });
};
