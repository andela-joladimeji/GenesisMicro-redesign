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
    file: [{
        path: {
            type: String
        }
    }]
});

mongoose.model('Resume', ResumeSchema);
