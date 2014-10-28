'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	HomePage = mongoose.model('HomePage'),
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
 * Create a Home page
 */
exports.createHomePage = function(req, res) {
	var homePage = new HomePage(req.body);
	homePage.user = req.user;

	homePage.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(homePage);
		}
	});
};

/**
 * Show the current Home page
 */
exports.readHomePage = function(req, res) {
	// res.jsonp(homePage);
	console.log(HomePage);

};

/**
 * Update a Home page
 */
exports.updateHomePage = function(req, res) {
	var homePage = req.page;

	homePage = _.extend(homePage , req.body);

	homePage.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(homePage);
		}
	});
};


/**
 * Page middleware
 */
// exports.homePageByID = function(req, res, next, id) { HomePage.findById(id).populate('user', 'displayName').exec(function(err, page) {
// 		if (err) return next(err);
// 		if (! page) return next(new Error('Failed to load Page ' + id));
// 		req.page = page ;
// 		next();
// 	});
// };

/**
 * Page authorization middleware
 */
// exports.hasAuthorization = function(req, res, next) {
// 	var homePage = req.
// 	if (req.homePage.user.id !== req.user.id) {
// 		return res.send(403, 'User is not authorized');
// 	}
// 	next();
// };

