'use strict';

//Blogs service used to communicate Blogs REST endpoints
angular.module('blogs').factory('Comments', ['$resource',
	function($resource) {
		return $resource('blogs/:blogId/comments/:commentId', { blogId: '@blogId', commentId : '@_id',
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);