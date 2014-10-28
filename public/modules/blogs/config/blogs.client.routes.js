'use strict';

//Setting up route
angular.module('blogs').config(['$stateProvider',
	function($stateProvider) {
		// Blogs state routing
		$stateProvider.
		state('listBlogs', {
			url: '/admin/blogs',
			templateUrl: 'modules/blogs/views/list-blogs.client.view.html'
		}).
		state('createBlog', {
			url: '/admin/blogs/create',
			templateUrl: 'modules/blogs/views/create-blog.client.view.html'
		}).
		state('viewBlog', {
			url: '/admin/blogs/:blogId',
			templateUrl: 'modules/blogs/views/view-blog.client.view.html'
		}).
		state('selectedBlog', {
			url: '/admin/viewBlog',
			templateUrl: 'modules/blogs/views/selected-blog.client.view.html'
		}).
		state('editBlog', {
			url: '/admin/blogs/:blogId/edit',
			templateUrl: 'modules/blogs/views/edit-blog.client.view.html'
		});
	}
]);