'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResumeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: 'Please fill in your name'
    },
    resumeURL: {
        type: Array,
        default: ''
    }
});

mongoose.model('Resume', ResumeSchema);
