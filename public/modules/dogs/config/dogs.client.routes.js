'use strict';

// Setting up route
angular.module('dogs').config(['$stateProvider',
    function ($stateProvider) {
        // Dogs state routing
        $stateProvider.
            state('listDogs', {
                url: '/dogs',
                templateUrl: 'modules/dogs/views/list-dogs.client.view.html'
            }).
            state('createDogs', {
                url: '/dogs/create',
                templateUrl: 'modules/dogs/views/create-dog.client.view.html'
            }).
            state('viewDogs', {
                url: '/dogs/:dogId',
                templateUrl: 'modules/dogs/views/view-dogs.client.view.html'
            }).
            state('editDogs', {
                url: '/dogs/:dogId/edit',
                templateUrl: 'modules/dogs/views/edit-dogs.client.view.html'
            });
    }
]);
