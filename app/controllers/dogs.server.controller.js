'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Dog = mongoose.model('Dog'),
	_ = require('lodash');



/**
 * Create a dog
 */
exports.create = function(req, res) {
	var dog = new Dog(req.body);
	dog.user = req.user;

	dog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dog);
		}
	});
};

/**
 * Show the current dog
 */
exports.read = function(req, res) {
	res.json(req.dog);
};

/**
 * Update a dogs
 */
exports.update = function(req, res) {
	var dog = req.dog;

	dog = _.extend(dog, req.body);

	dog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(dog);
		}
	});
};

/**
 * Delete an dog
 */
exports.delete = function(req, res) {
    var dog = req.dog;
    console.log("dit is de delete knop functie ding");
    dog.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(dog);
        }
    });
};

/**
 * List of Dogs
 */
exports.list = function(req, res) {
    Dog.find().sort('-created').populate('user', 'displayName').exec(function(err, dogs) {
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
exports.dogByID = function(req, res, next, id) {
    console.log(id + "here is the given id");
    Dog.findById(id).populate('user', 'displayName').exec(function(err, dog) {
        if (err) return next(err);
        if (!dog) return next(new Error('Failed to load dog ' + id));
        req.dog = dog;
        next();
    });
};

/**
 * Dogs authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.dog.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
