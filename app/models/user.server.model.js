'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * A Validation function for local strategy postal code
 */
var validateLocalStrategyPostalCode= function(postalcode) {
	return (this.provider !== 'local' || (postalcode && postalcode.length == 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	//firstName: {
	//	type: String,
	//	trim: true,
	//	default: '',
	//	validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	//},
	//lastName: {
	//	type: String,
	//	trim: true,
	//	default: '',
	//	validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	//},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		required: 'Vul een email in',
		trim: true,
		validate: [validateLocalStrategyProperty, 'Vul een emailadres in'],
		match: [/.+\@.+\..+/, 'Vul een geldig emailadres in']
	},
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Vul een asielnaam in',
		trim: true
	},
	adress: {
		type: String,
		required: 'Vul een adres in',
		default: '',
		trim: true
	},
	postalcode: {
		type: String,
		required: 'Vul een postcode in',
		trim: true,
		default: '',
		validate: [validateLocalStrategyPostalCode, 'Vul uw postcode correct in. Gelieve geen spaties te gebruiken']
	},
	password: {
		type: String,
		required: 'Vul een wachtwoord in',
		default: '',
		validate: [validateLocalStrategyPassword, 'Het wachtwoord is te kort. Gelieve langer dan 6 tekens']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);
