'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactFormSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        required: 'Please fill in a first name'
    },
    lastName: {
        type: String,
        required: 'Please fill in a last name'
    },
    email: {
        type: String,
        default: '',
        required: 'Please fill in your email'
    },
    subject: {
        type: String,
        required: 'Please fill in a subject'
    },
    message: {
        type: String,
        required: 'Please fill in a message'
    }
});

mongoose.model('ContactForm', ContactFormSchema);
