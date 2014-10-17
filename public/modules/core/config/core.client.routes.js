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
		.state('connect', {
			url: '/contact',
			templateUrl: 'modules/core/views/connect.client.view.html'
		})
		.state('insights', {
			url: '/insights',
			templateUrl: 'modules/core/views/insights.client.view.html'
		});
		// .state('details', {
		// 	url: '/insights',
		// 	templateUrl: 'modules/core/views/insights.details.client.view.html'
		// });
	}
]);

