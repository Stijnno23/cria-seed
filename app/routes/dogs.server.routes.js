/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    dogs = require('../../app/controllers/dogs.server.controller');

module.exports = function (app) {
    // Dog Routes
    app.route('/dogs')
        .get(dogs.list)
        .post(users.requiresLogin, dogs.create);

    app.route('/dogs/:dogId')
        .get(dogs.read)
        .put(users.requiresLogin, dogs.hasAuthorization, dogs.update)
        .delete(users.requiresLogin, dogs.hasAuthorization, dogs.delete);

    // Finish by binding the dog middleware
    app.param('dogId', dogs.dogByID);
};
