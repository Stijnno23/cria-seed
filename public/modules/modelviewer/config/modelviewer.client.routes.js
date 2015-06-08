'use strict';

// Setting up modelviewer
angular.module('modelviewer').config(['$stateProvider',
    function ($stateProvider) {
        // Modelviewer state routing
        $stateProvider.
            state('createModelviewer', {
                url: '/modelviewer',
                templateUrl: 'modules/modelviewer/views/create-modelviewer.client.view.html'
            }).
            state('resultModelviewer' ,{
            url: '/modelviewer/results',
                templateUrl: 'modules/cats/views/results-cats.client.view.html'
        });
    }
]);
