module.exports = function(config) {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine'],
        files: [
            'src/**/*.js',
            'test/unit/**/*.spec.js'
        ],
        exclude: [
            '**/app.js'
        ],
        reporters: ['progress', 'growl'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};
