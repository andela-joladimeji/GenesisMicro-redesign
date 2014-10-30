'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Resume = mongoose.model('Resume'),
    _ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Resume already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

/**
 * Create a Resume
 */
exports.create = function(req, res) {
    var resume = new Resume(req.body);
    // resume.user = req.user;

    resume.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(resume);
        }
    });
};

/**
 * Show the current Resume
 */
exports.read = function(req, res) {
    res.jsonp(req.resume);
};

/**
 * Update a Resume
 */
exports.update = function(req, res) {
    var resume = req.resume;

    resume = _.extend(resume, req.body);

    resume.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(resume);
        }
    });
};

/**
 * Delete an Resume
 */
exports.delete = function(req, res) {
    var resume = req.resume;

    resume.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(resume);
        }
    });
};

/**
 * List of Resumes
 */
exports.list = function(req, res) {
    Resume.find().sort('-created').exec(function(err, resumes) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(resumes);
        }
    });
};

/**
 * Resume middleware
 */
exports.resumeByID = function(req, res, next, id) {
    Resume.findById(id).exec(function(err, resume) {
        if (err) return next(err);
        if (!resume) return next(new Error('Failed to load Resume ' + id));
        req.resume = resume;
        next();
    });
};

/**
 * Resume authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.resume.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
    }
    next();
};
