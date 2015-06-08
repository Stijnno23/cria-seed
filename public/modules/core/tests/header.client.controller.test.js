/*jslint node: true */
/*global $, describe, beforeEach, ApplicationConfiguration, inject, it, expect */
'use strict';

(function () {
    describe('HeaderController', function () {
        //Initialize global variables
        var scope;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
        }));

        it('should expose the authentication service', function () {
            expect(scope.authentication).toBeTruthy();
        });
    });
}());
