/*jslint node: true */
/*global $, angular */
'use strict';

//Cats service used for communicating with the cats REST endpoints
angular.module('modelviewer').factory('Modelviewer', ['$resource',
    function ($resource) {
        return $resource('modelviewer/:modelviewerId', {
            modelviewerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
    ]);
