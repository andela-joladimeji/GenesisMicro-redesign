'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var pages = require('../../app/controllers/pages');
	var homePage = require('../../app/controllers/home-page');

	// Pages Routes
	app.route('/pages')
		.get(pages.list)
		.post(users.requiresLogin, pages.create);

	app.route('/pages/:pageId')
		.get(pages.read)
		.put(users.requiresLogin, pages.hasAuthorization, pages.update)
		.delete(users.requiresLogin, pages.hasAuthorization, pages.delete);


	app.route('/homePage')
		.post(users.requiresLogin, homePage.createHomePage)
		.get(homePage.readHomePage)
		.put(users.requiresLogin, homePage.updateHomePage);

	// app.route('homePageId', homePage.homePageByID);
	// Finish by binding the Page middleware
	app.param('pageId', pages.pageByID);
};