'use strict';

//Blogs service used to communicate Blogs REST endpoints
angular.module('blogs').factory('Blogs', ['$resource',
	function($resource) {
		return $resource('blogs/:blogId', { blogId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('blogs').factory('SelectedBlog', ['$resource',
	function($resource) {
		return $resource('blogs/:blogId/selected', { blogId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);