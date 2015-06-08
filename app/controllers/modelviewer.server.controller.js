/*jslint node: true */
'use strict';

//Defines all the modelviewer functions for querying to the database

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Cat = mongoose.model('Cat'),
    _ = require('lodash');


/**
 * Show the current cat
 */
exports.read = function (req, res) {
    res.json(req.cat);
};


/**
 * List of cats
 */
exports.list = function (req, res) {
    Cat.find().exec(function (err, cats) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(cats);
    });
};

/**
 * Cat middleware
 */
exports.catByID = function (req, res, next, id) {
    console.log(id + "here is the given id");
    Cat.findById(id).populate('user', 'displayName').exec(function (err, cat) {
        if (err) {
            return next(err);
        }
        if (!cat) {
            return next(new Error('Failed to load cat ' + id));
        }
        req.cat = cat;
        next();
    });
};

