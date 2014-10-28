'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
		.state('about-us', {
			url: '/about-us',
			templateUrl: 'modules/core/views/about-us.client.view.html'
		})
		.state('about-you', {
			url: '/about-you',
			templateUrl: 'modules/core/views/about-you.client.view.html'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'modules/core/views/connect.client.view.html'
		})
		.state({'testimonial',
			url: '/testimonial',
			templateUrl: 'modules/core/views/testimonial.client.view.html'
		})
		.state('community', {
			url: '/community',
			templateUrl: 'modules/core/views/insights.home.client.view.html'
		})
		.state('clientsComments', {
			url: '/clientsComments',
			templateUrl: 'modules/core/views/clientsComments.client.view.html'
		})
		.state('download', {
			url: '/download',
			templateUrl: 'modules/core/views/downloads.client.view.html'
		})
		.state('our_vision', {
			url: '/our_vision',
			templateUrl: 'modules/core/views/vision.client.view.html'
		})
		.state('customer-story',{
			url: '/customer-success-story',
			templateUrl: 'modules/core/views/customer-story.view.html'
		})
		.state('community_blog', {
			url: '/community/2013-10-1-avoidable-mistakes',
			templateUrl: 'modules/core/views/insights.2013-10-1-avoidable-mistakes.client.view.html'
		});
	}
]);

