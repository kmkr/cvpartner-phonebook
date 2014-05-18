module.exports = function(config) {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine'],
        files: [
            '**/angular.js',
            'src/lib/**/*.js',
            '**/phonebook.js',
            'src/**/*.js',
            'test/unit/**/*.spec.js'
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
