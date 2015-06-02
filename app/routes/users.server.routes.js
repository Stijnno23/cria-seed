/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    // User Routes
    var users = require('../../app/controllers/users.server.controller');

    // Setting up the users profile api
    app.route('/users/me').get(users.me);
    app.route('/users').put(users.update);
    app.route('/users/accounts').delete(users.removeOAuthProvider);

    // Setting up the users password api
    app.route('/users/password').post(users.changePassword);

    // Setting up the users authentication api
    app.route('/auth/signup').post(users.signup);
    app.route('/auth/signin').post(users.signin);
    app.route('/auth/signout').get(users.signout);

    // Finish by binding the user middleware
    app.param('userId', users.userByID);
};
