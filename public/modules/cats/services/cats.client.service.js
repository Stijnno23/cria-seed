'use strict';

//Cats service used for communicating with the cats REST endpoints
angular.module('cats').factory('Cats', ['$resource',
    function($resource) {
        return $resource('cats/:catId', {
            catId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
