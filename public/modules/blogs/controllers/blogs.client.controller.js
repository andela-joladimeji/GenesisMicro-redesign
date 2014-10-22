'use strict';

// Blogs controller
angular.module('blogs').controller('BlogsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Blogs', 'SelectedBlog','Comments',
	function($scope, $stateParams, $location, $http, Authentication, Blogs, SelectedBlog, Comments) {
		$scope.authentication = Authentication;

		// Create new Blog
		$scope.create = function() {
			// Create new Blog object
			var blog = new Blogs ({
				title: this.title,
				blogContent: this.blogContent
			});

			console.log(blog);
			// Redirect after save
			blog.$save(function(response) {
				console.log(response);
				console.log('admin/blogs/' + response._id);

				$location.path('admin/blogs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.title = '';
			this.content = '';
		};

		// Remove existing Blog
		$scope.remove = function( blog ) {
			if ( blog ) { blog.$remove();

				for (var i in $scope.blogs ) {
					if ($scope.blogs [i] === blog ) {
						$scope.blogs.splice(i, 1);
					}
				}
			} else {
				$scope.blog.$remove(function() {
					$location.path('blogs');
				});
			}
		};

		// Update existing Blog
		$scope.update = function() {
			var blog = $scope.blog;

			blog.$update(function() {
				$location.path('blogs/' + blog._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Blogs
		$scope.find = function() {
			$scope.blogs = Blogs.query();
		};

		// Find existing Blog
		$scope.findOne = function() {
			$scope.blog = Blogs.get({ 
				blogId: $stateParams.blogId
			});
			console.log($scope.blog.blogContent);
			console.log($scope.blog.created);
			console.log($scope.blog);
		};

		$scope.selectBlog = function(blog_state) {


			$scope.selectedBlog = blog_state;
			$scope.selectedBlog.selected = true;
			var blog = new Blogs ({
				title: $scope.selectedBlog.title,
				blogContent: $scope.selectedBlog.blogContent,
				selected: $scope.selectedBlog.selected,
				blogId: $stateParams.blogId,
				Comments: $scope.selectedBlog.comments,
				// likes: $scope.selectedBlog.likes,
				// created: $scope.selectedBlog.created
			});
			// blogs/:blogId/selected
			console.log(blog.blogId);
			console.log($stateParams.blogId);
			blog.$update(function(response) {
				console.log(response);
			// 	// $location.path('admin/blogs/' + blog.created + );
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		$scope.selectedBlog = function() {
			$scope.blog = Blogs.get({ 
				blogId: $stateParams.blogId
			});
		};
	}
]);



		// $scope.selectBlog = function(blog) {
		// 	console.log(blog);
		// 	console.log($stateParams.blogId);

		// 	$scope.selectedBlog = blog;
		// 	$scope.selectedBlog.selected = true;
		// 	var blog = new Blogs ({
		// 		title: $scope.selectedBlog.title,
		// 		blogContent: $scope.selectedBlog.blogContent,
		// 		selected: $scope.selectedBlog.selected,
		// 		blogId: $stateParams.blogId,
		// 		Comments: $scope.selectedBlog.comments
		// 		// ,
		// 		// likes: $scope.selectedBlog.likes,
		// 		// created: $scope.selectedBlog.created
		// 	});

		// 	console.log(blog.blogId);
			
		// 	console.log(blog);
		// 	// Redirect after save
		// 	// blog.$save(function(response) {
		// 	// 	console.log(response);
		// 	// 	console.log('admin/blogs/' + blog.id + '/selected');
		// 	// }, function(errorResponse) {
		// 	// 	$scope.error = errorResponse.data.message;
		// 	// });

		// 	$http.put('/blogs/' + blog.blogId + '/selected').success(function(response){
		// 		// If successful show success message and clear form
  //           $scope.success = true;

	 //            // $scope.appt = response;
	 //            console.log('Success - Done', response);
	 //        }).error(function(response) {
	 //            $scope.error = response.message;
	 //            console.log($scope.error);
	 //        });
		// 	// blog.$update(function() {
		// 	// 	// $location.path('admin/blogs/' + blog.created + );
		// 	// }, function(errorResponse) {
		// 	// 	$scope.error = errorResponse.data.message;
		// 	// });

		// };