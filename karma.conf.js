// Karma configuration
// Generated on Sun Jan 31 2016 11:25:45 GMT+0300 (MSK)

var path = require('path');

var coverage = process.env.COVERAGE === 'true';
var webpackConfig = getWebpackConfig();

var entry = path.join(webpackConfig.context, webpackConfig.entry);

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'mocha'],


    // list of files / patterns to load in the browser
    files: [
      './src/app.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/app.test.js': ['webpack']
    },

    webpack: webpackConfig,
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: getReporters(),

    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'}
      ]
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


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Plugins
    plugins: [
      require('karma-webpack'),
      'karma-coverage',
      'karma-chai',
      'karma-mocha',
      'karma-chrome-launcher'
    ]
  })
};

function getReporters() {
  var reporters = ['progress'];
  if(coverage) {
    reporters.push('coverage');
  }
  return reporters;
}

function getWebpackConfig() {
  var webpackConfig = require('./webpack.config');
  if(coverage) {
    webpackConfig.module.loaders[0].exclude = /node_modules|^((?!\.(test|mock)\.).)*$/i;

    webpackConfig.isparta = {
      embedSource: true,
      noAutoWrap: true,
      babel: {
        presets: ['es2015']
      }
    };

    webpackConfig.module.loaders.push({
      test: /^((?!\.(test|mock)\.).)*$/i,
      include: path.join(__dirname, 'src'),
      exclude: /\.(styl|jade)$/,
      loader: 'isparta-loader'
    });

  }
  return webpackConfig;
}