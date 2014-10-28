// angular.module('blogs').factory('SelectedBlog', ['$resource',
// 	function($resource) {
// 		return $resource('blogs/:blogId/selected', { blogId: '@blog._id'
// 		}, {
// 			update: {
// 				method: 'PUT'
// 			}
// 		});
// 	}
// ]);