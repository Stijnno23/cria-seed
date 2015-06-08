/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    cats = require('../../app/controllers/modelviewer.server.controller');

module.exports = function (app) {
    // Cat Routes
    app.route('/cats')
        .get(cats.list);

    app.route('/cats/:catId')
        .get(cats.read);

    // Finish by binding the cat middleware
    app.param('catId', cats.catByID);

};
