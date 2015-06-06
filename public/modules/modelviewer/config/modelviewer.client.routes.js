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
            state('3dview' ,{
            url: '/3dviewer',
                templateUrl: 'modules/modelviewer/views//index.html'
        });
    }
]);
