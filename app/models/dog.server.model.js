/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Dog Schema
 */
var DogSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    animaltype: {
        type: String,
        default: 'Dog',
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
        trim: true
    },
    picture: {
        type: String,
        default: '',
        trim: true
    },
    age: {
        type: String,
        default: '',
        trim: true
    },
    eyecolor: {
        type: String,
        default: '',
        trim: true
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    gender: {
        type: String,
        default: '',
        trim: true
    },
    size: {
        type: String,
        default: '',
        trim: true
    },
    breedgroup: {
        type: String,
        default: '',
        trim: true
    },
    kids: {
        type: String,
        default: '',
        trim: true
    },
    about: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Dog', DogSchema);
