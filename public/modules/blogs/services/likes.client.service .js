'use strict';

//Blogs service used to communicate Blogs REST endpoints
angular.module('blogs').factory('Likes', ['$resource',
	function($resource) {
		return $resource('blogs/:blogId/:choice', {}, {
            save: {method: 'POST', params: {choice:"like", blogId: '@blogId'}},
            destroy: {method: 'DELETE', params: {choice:"unlike", blogId: '@blogId'}}     
		});
	}
]);