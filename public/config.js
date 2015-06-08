/*jslint node: true */
/*global $, angular */
'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
    // Init module configuration options
    var registerModule,
        applicationModuleName = 'animania',
        applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'flow'];

    // Add a new vertical module
    registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
}());
