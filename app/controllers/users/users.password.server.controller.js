/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    config = require('../../../config/config'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    crypto = require('crypto');

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = function (req, res, next) {
    async.waterfall([
        // Generate random token
        function (done) {
            crypto.randomBytes(20, function (err, buffer) {
                var token = buffer.toString('hex');
                done(err, token);
            });
        },
        // Lookup user by username
        function (token, done) {
            if (req.body.username) {
                User.findOne({
                    username: req.body.username
                }, '-salt -password', function (err, user) {
                    if (!user) {
                        return res.status(400).send({
                            message: 'Er is geen account met deze asielnaam gevonden'
                        });
                    }
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function (err) {
                        done(err, token, user);
                    });
                });
            } else {
                return res.status(400).send({
                    message: 'Asielnaam mag niet leeg zijn'
                });
            }
        },
        function (token, user, done) {
            res.render('templates/reset-password-email', {
                name: user.displayName,
                appName: config.app.title,
                url: 'http://' + req.headers.host + '/auth/reset/' + token
            }, function (err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
            var smtpTransport = nodemailer.createTransport(config.mailer.options),
                mailOptions = {
                    to: user.email,
                    from: config.mailer.from,
                    subject: 'Wachtwoord reset',
                    html: emailHTML
                };
            smtpTransport.sendMail(mailOptions, function (err) {
                if (!err) {
                    res.send({
                        message: 'Een email is verstuurd naar ' + user.email + ' met verdere instructies.'
                    });
                }

                done(err);
            });
        }
    ], function (err) {
        if (err) {
            return next(err);
        }
    });
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function (req, res) {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function (err, user) {
        if (!user) {
            return res.redirect('/#!/password/reset/invalid');
        }

        res.redirect('/#!/password/reset/' + req.params.token);
    });
};

/**
 * Reset password POST from email token
 */
exports.reset = function (req, res, next) {
    // Init Variables
    var passwordDetails = req.body;

    async.waterfall([

        function (done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function (err, user) {
                if (!err && user) {
                    if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                        user.password = passwordDetails.newPassword;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            }
                            req.login(user, function (err) {
                                if (err) {
                                    res.status(400).send(err);
                                } else {
                                    // Return authenticated user
                                    res.json(user);

                                    done(err, user);
                                }
                            });
                        });
                    } else {
                        return res.status(400).send({
                            message: 'Wachtwoorden komen niet overeen'
                        });
                    }
                } else {
                    return res.status(400).send({
                        message: 'Wachtwoord reset teken is ongeldig of verlopen.'
                    });
                }
            });
        },
        function (user, done) {
            res.render('templates/reset-password-confirm-email', {
                name: user.displayName,
                appName: config.app.title
            }, function (err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
            var smtpTransport = nodemailer.createTransport(config.mailer.options),
                mailOptions = {
                    to: user.email,
                    from: config.mailer.from,
                    subject: 'Je wachtwoord is veranderd',
                    html: emailHTML
                };

            smtpTransport.sendMail(mailOptions, function (err) {
                done(err, 'klaar');
            });
        }
    ], function (err) {
        if (err) {
            return next(err);
        }
    });
};

/**
 * Change Password
 */
exports.changePassword = function (req, res) {
    // Init Variables
    var passwordDetails = req.body;

    if (req.user) {
        if (passwordDetails.newPassword) {
            User.findById(req.user.id, function (err, user) {
                if (!err && user) {
                    if (user.authenticate(passwordDetails.currentPassword)) {
                        if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                            user.password = passwordDetails.newPassword;

                            user.save(function (err) {
                                if (err) {
                                    return res.status(400).send({
                                        message: errorHandler.getErrorMessage(err)
                                    });
                                }
                                req.login(user, function (err) {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        res.send({
                                            message: 'Wachtwoord succesvol veranderd'
                                        });
                                    }
                                });
                            });
                        } else {
                            res.status(400).send({
                                message: 'Wachtwoorden komen niet overeen'
                            });
                        }
                    } else {
                        res.status(400).send({
                            message: 'Het huidige wachtwoord is incorrect'
                        });
                    }
                } else {
                    res.status(400).send({
                        message: 'Gebruiker niet gevonden'
                    });
                }
            });
        } else {
            res.status(400).send({
                message: 'Voer een nieuw wachtwoord in'
            });
        }
    } else {
        res.status(400).send({
            message: 'Gebruiker is niet ingelogd'
        });
    }
};
