'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Dogs = mongoose.model('Dogs'),
	Dogs = mongoose.model('Dogs'),
	_ = require('lodash');

/**
 * Create a dog
 */
exports.create = function(req, res) {
	var dogs = new Dogs(req.body);
	dogs.user = req.user;

	dogs.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dogs);
		}
	});
};

/**
 * Show the current dog
 */
exports.read = function(req, res) {
	res.json(req.dogs);
};

/**
 * Update a dogs
 */
exports.update = function(req, res) {
	var dogs = req.dogs;

	dogs = _.extend(dogs, req.body);

	dogs.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dogs);
		}
	});
};

/**
 * Delete an dogs
 */
exports.delete = function(req, res) {
	var dogs = req.dogs;

	dogs.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dogs);
		}
	});
};

/**
 * List of Dogs
 */
exports.list = function(req, res) {
	Dogs.find().sort('-created').populate('user', 'displayName').exec(function(err, dogs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dogs);
		}
	});
};

/**
 * Dogs middleware
 */
exports.articleByID = function(req, res, next, id) {
	Dogs.findById(id).populate('user', 'displayName').exec(function(err, dogs) {
		if (err) return next(err);
		if (!dogs) return next(new Error('Failed to load dog ' + id));
		req.dogs = dogs;
		next();
	});
};

/**
 * Dogs authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.dogs.user.id !== req.dogs.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
