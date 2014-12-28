// Karma configuration
// Generated on Wed Sep 11 2013 20:50:28 GMT+0200 (W. Europe Daylight Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/components/jquery/jquery.min.js',
      'src/components/angular/angular.min.js',
      'src/components/angular-mocks/angular-mocks.js',
      'src/components/q/q.js',
      'src/components/idbwrapper/idbstore.js',
      'spec/helpers/*.js',
      'src/js/directives/*.js',
      'src/js/services/*.js',
      'src/js/views/*.js',
      'src/js/filters/*.js',
      'src/js/controllers/*.js',
      'spec/mocks/*.js',
      'spec/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/js/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
