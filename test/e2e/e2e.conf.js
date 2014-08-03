exports.config = {

    seleniumServerJar: '../../node_modules/selenium-standalone/.selenium/2.42.0/server.jar',
    seleniumPort: 59754,
    chromeDriver: '../../node_modules/.bin/chromedriver',
    chromeOnly: false,
    seleniumArgs: [],
    allScriptsTimeout: 11000,

    specs: [
        'specs/**/**/*Spec.js'
    ],

    exclude: [],
    maxSessions: -1,
    capabilities: {
        browserName: 'chrome',
        count: 1,
        shardTestFiles: false,
        maxInstances: 1
    },

    // capabilities: {
    //     browserName: 'phantomjs',
    //     version: '',
    //     platform: 'ANY'
    // },

    multiCapabilities: [],
    baseUrl: 'http://127.0.0.1:9000',
    rootElement: 'body',
    onPrepare: function() {
        browser.ignoreSynchronization = true;

        // global.isAngularSite = function (flag) {
        //     browser.ignoreSynchronization = !flag;
        //     // browser.ignoreSynchronization = true;
        //     console.log('Ignore sync: ' + !flag);
        // };
    },
    framework: 'jasmine',

    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 3000
    },

    mochaOpts: {
        ui: 'bdd',
        reporter: 'list'
    },

    onCleanUp: function () {

    }
};
