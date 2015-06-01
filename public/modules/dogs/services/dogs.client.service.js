'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('dogs').factory('Dogs', ['$resource',
    function($resource) {
        return $resource('dogs/:dogId', {
            dogId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
