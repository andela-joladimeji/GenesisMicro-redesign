'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Page = mongoose.model('Page'),
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
				message = 'Page already exists';
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
 * Create a Page
 */
exports.create = function(req, res) {
	var page = new Page(req.body);
	page.user = req.user;

	page.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(page);
		}
	});
};

/**
 * Show the current Page
 */
exports.read = function(req, res) {
	res.jsonp(req.page);
};

/**
 * Update a Page
 */
exports.update = function(req, res) {
	var page = req.page ;

	page = _.extend(page , req.body);

	page.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(page);
		}
	});
};

/**
 * Delete an Page
 */
exports.delete = function(req, res) {
	var page = req.page ;

	page.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(page);
		}
	});
};

/**
 * List of Pages
 */
exports.list = function(req, res) { Page.find().sort('-created').populate('user', 'displayName').exec(function(err, pages) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(pages);
		}
	});
};

/**
 * Page middleware
 */
exports.pageByID = function(req, res, next, id) { Page.findById(id).populate('user', 'displayName').exec(function(err, page) {
		if (err) return next(err);
		if (! page) return next(new Error('Failed to load Page ' + id));
		req.page = page ;
		next();
	});
};

/**
 * Page authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.page.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};