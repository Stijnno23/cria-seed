/*jslint node: true */
/*global $, angular */
'use strict';

angular.module('modelviewer').controller('ModelviewerController', ['$scope', '$stateParams', '$location', 'Modelviewer',
    function ($scope, $stateParams, $location, Modelviewer) {

        $scope.find = function () {
            $scope.modelviewer = Modelviewer.query();
        };

        $scope.findOne = function () {
            $scope.modelviewer = Modelviewer.get({
                modelviewerId: $stateParams.modelviewerId
            });
        };
    }
]);

