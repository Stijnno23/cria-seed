/*jslint node: true */
/*global $, angular */
'use strict';

//Defines the Homecontroller
angular.module('core').controller('HomeController', ['$scope', 'Authentication',
    function ($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
    }
    ]);
