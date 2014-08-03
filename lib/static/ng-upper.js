/*! upper - v0.1.0 - 2014-08-03 */ 
 
 (function () { 
    'use strict';
    /**
     * @class Upper
     * @desc Client side Upper object with AMD compatability
     * @returns self - attacked to window when AMD is not utilized
     */
    var Upper = function (_config) {
        this.config = {
            type: (_config && _config.type) || 'socket'
        };
    };

    /**
     * @method upload
     */
    Upper.prototype.listen = function (element) {

        console.log('Listen!');
        // var reader = new FileReader();
        // blob it
        element.onchange = function () {
            
        };
    };

    /**
     * @class AngularUpper
     * @desc AngularJS directive for interfacing with the Upper uploader
     * @example app.module('myApp', ['ngUpper'])
     *          <input type="file" upper="{ 'preview': someBinding, 'binary': 'someOtherBinding' }"/>
     * @note upper.js and this file need to be concentrated in order for full funtionality
     */
    var AngularUpper = function (_angular) {
        _angular.module('ngUpper', []).directive('upper', [function () {
            return {
                restrict: 'A',
                link: function () {

                    // Get the element for the link function
                    var element = (arguments && arguments[1]) || {};
                    var upper = new Upper();

                    upper.listen(element).on('preview', function () {

                    }).on('data', function () {

                    });
                }
            };
        }]);
    };

    // If angular is AMD defined, use it for initialization, otherwise use global scoped version
    if(typeof window.define === 'function' && window.define.amd) {
        window.define(['angular'], function (_angular) {
            return new AngularUpper(_angular);
        });
    // Use the normal included angular if avaliable
    } else if (window.angular) {
        return new AngularUpper(window.angular);
    // If no angular is found
    } else {
        throw new Error('You must include AngularJS to use the ng-upper directive');
    }

 })();
