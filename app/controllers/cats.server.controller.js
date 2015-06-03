/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Cat = mongoose.model('Cat'),
    _ = require('lodash');

/**
 * Create a cat
 */
exports.create = function (req, res) {
    var cat = new Cat(req.body);
    cat.user = req.user;

    cat.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(cat);
    });
};

/**
 * Show the current cat
 */
exports.read = function (req, res) {
    res.json(req.cat);
};

/**
 * Update a cat
 */
exports.update = function (req, res) {
    var cat = req.cat;

    cat = _.extend(cat, req.body);

    cat.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(cat);
    });
};

/**
 * Delete an cat
 */
exports.delete = function (req, res) {
    var cat = req.cat;

    cat.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(cat);
    });
};

/**
 * List of cats
 */
exports.list = function (req, res) {
    Cat.find().sort('-created').populate('user', 'displayName').exec(function (err, cats) {
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

/**
 * Cat authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.cat.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
