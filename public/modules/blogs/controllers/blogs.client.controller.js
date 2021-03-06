'use strict';

// Blogs controller
angular.module('blogs').controller('BlogsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Blogs','Comments', 'Likes',
	function($scope, $stateParams, $location, $http, Authentication, Blogs, Comments, Likes) {
		$scope.authentication = Authentication;

		// Create new Blog
		$scope.create = function() {
			// Create new Blog object
			var blog = new Blogs ({
				title: this.title,
				blogContent: this.blogContent,
				caption: this.caption,
				madeBy: this.madeBy
			});

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
			this.caption = '';
			this.madeBy = '';
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

		};

		$scope.selectBlog = function(blog_state) {
			$scope.selectedBlog = blog_state;
			$scope.selectedBlog.selected = true;
			console.log($scope.selectedBlog);
			var blog = new Blogs ({
				title: $scope.selectedBlog.title,
				blogContent: $scope.selectedBlog.blogContent,
				selected: $scope.selectedBlog.selected
			});
			
			$http.put('/blogs/' + $stateParams.blogId + '/selected', blog).success(function(response){
				// If successful show success message and clear form
            	$scope.success = true;
	            // $scope.appt = response;
	            console.log(response);
	        }).error(function(response) {
	            $scope.error = response.message;
	            console.log($scope.error);
	        });	
		};
 
		$scope.displayBlog = function() {
			$http.get('/selected').success(function(response){
				// If successful show success message and clear form
            	$scope.success = true;
	            // $scope.appt = response;
	            console.log(response);
	             $scope.blog = response[0];

	           
	        }).error(function(response) {
	            $scope.error = response.message;
	            console.log($scope.error);
	        });	 
		};

		// Create new Blog
		$scope.createComment = function() {
			// Create new Blog object
			var comment = new Comments ({
				commentContent: this.commentContent,
				blogId: $scope.blog._id
	
			});

			comment.$save(function(response) {
				console.log(response);
				$scope.blog = response;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			// Clear form fields
			this.commentContent = '';
		};

		$scope.likeBlog = function() {
			console.log('like');
			var like = new Likes({
				blogId: $scope.blog._id,
				choice: 'like'
			});
			console.log('inlike');
			like.$save(function(response){
				$scope.liked = true;
				$scope.blog = response;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;

			});
		};


		

	}
]);
