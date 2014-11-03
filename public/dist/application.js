'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'genesis-micro';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'angularFileUpload'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName) {
      // Create angular module
      angular.module(moduleName, []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('admin');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('blogs');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
//Setting up route
angular.module('admin').config([
  '$stateProvider',
  function ($stateProvider) {
    // Lists state routes
    $stateProvider.state('signInUser', {
      url: '/admin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    });
  }
]);// // enable  and disable comment
// // display user.name
// // or commentor
// 'use strict';
// // Lists controller
// angular.module('admin').controller('AdminController', ['$scope', 'Authentication', '$stateParams', '$location',
//   function($scope, Authentication, $stateParams, $location) {
//     $scope.user = Authentication.user;
//     // Create new user
// ]);
'use strict';
// Admin service for admin variables
angular.module('admin').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('admin', {}, { update: { method: 'PUT' } });
  }
]);
angular.module('admin').filter('range', function () {
  return function (input, total, start) {
    total = parseInt(total);
    for (var i = start; i < total; i++)
      input.push(i);
    return input;
  };
});
//Test service for communicating with the test api endpoint
angular.module('admin').factory('Tests', [
  '$resource',
  function ($resource) {
    return $resource('admin/test/:testId', { testId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Articles module
angular.module('blogs').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Blogs', 'blogs', 'dropdown', '/blogs(/create)?');
    Menus.addSubMenuItem('topbar', 'blogs', 'List Blogs', 'blogs');
    Menus.addSubMenuItem('topbar', 'blogs', 'New Blog', 'blogs/create');
  }
]);'use strict';
//Setting up route
angular.module('blogs').config([
  '$stateProvider',
  function ($stateProvider) {
    // Blogs state routing
    $stateProvider.state('listBlogs', {
      url: '/admin/blogs',
      templateUrl: 'modules/blogs/views/list-blogs.client.view.html'
    }).state('createBlog', {
      url: '/admin/blogs/create',
      templateUrl: 'modules/blogs/views/create-blog.client.view.html'
    }).state('viewBlog', {
      url: '/admin/blogs/:blogId',
      templateUrl: 'modules/blogs/views/view-blog.client.view.html'
    }).state('selectedBlog', {
      url: '/admin/viewBlog',
      templateUrl: 'modules/blogs/views/selected-blog.client.view.html'
    }).state('editBlog', {
      url: '/admin/blogs/:blogId/edit',
      templateUrl: 'modules/blogs/views/edit-blog.client.view.html'
    });
  }
]);'use strict';
// Blogs controller
angular.module('blogs').controller('BlogsController', [
  '$scope',
  '$stateParams',
  '$location',
  '$http',
  'Authentication',
  'Blogs',
  'Comments',
  'Likes',
  function ($scope, $stateParams, $location, $http, Authentication, Blogs, Comments, Likes) {
    $scope.authentication = Authentication;
    // Create new Blog
    $scope.create = function () {
      // Create new Blog object
      var blog = new Blogs({
          title: this.title,
          blogContent: this.blogContent,
          caption: this.caption,
          madeBy: this.madeBy
        });
      // Redirect after save
      blog.$save(function (response) {
        console.log(response);
        console.log('admin/blogs/' + response._id);
        $location.path('admin/blogs/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.title = '';
      this.content = '';
      this.caption = '';
      this.madeBy = '';
    };
    // Remove existing Blog
    $scope.remove = function (blog) {
      if (blog) {
        blog.$remove();
        for (var i in $scope.blogs) {
          if ($scope.blogs[i] === blog) {
            $scope.blogs.splice(i, 1);
          }
        }
      } else {
        $scope.blog.$remove(function () {
          $location.path('blogs');
        });
      }
    };
    // Update existing Blog
    $scope.update = function () {
      var blog = $scope.blog;
      blog.$update(function () {
        $location.path('blogs/' + blog._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Blogs
    $scope.find = function () {
      $scope.blogs = Blogs.query();
    };
    // Find existing Blog
    $scope.findOne = function () {
      $scope.blog = Blogs.get({ blogId: $stateParams.blogId });
    };
    $scope.selectBlog = function (blog_state) {
      $scope.selectedBlog = blog_state;
      $scope.selectedBlog.selected = true;
      console.log($scope.selectedBlog);
      var blog = new Blogs({
          title: $scope.selectedBlog.title,
          blogContent: $scope.selectedBlog.blogContent,
          selected: $scope.selectedBlog.selected
        });
      console.log(blog);
      $http.put('/blogs/' + $stateParams.blogId + '/selected', blog).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        // $scope.appt = response;
        console.log(response);
      }).error(function (response) {
        $scope.error = response.message;
        console.log($scope.error);
      });
    };
    $scope.displayBlog = function () {
      $http.get('/selected').success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        // $scope.appt = response;
        console.log(response);
        $scope.blog = response[0];
      }).error(function (response) {
        $scope.error = response.message;
        console.log($scope.error);
      });
    };
    // Create new Blog
    $scope.createComment = function () {
      // Create new Blog object
      var comment = new Comments({
          commentContent: this.commentContent,
          blogId: $scope.blog._id
        });
      comment.$save(function (response) {
        console.log(response);
        $scope.blog = response;
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.commentContent = '';
    };
    // / $scope.selectComment = function(){
    // // };
    // $scope.displayComment = function(){
    // };
    $scope.likeBlog = function () {
      console.log('like');
      var like = new Likes({
          blogId: $scope.blog._id,
          choice: 'like'
        });
      console.log('inlike');
      like.$save(function (response) {
        $scope.liked = true;
        $scope.blog = response;
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);// angular.module('core').directive('details', function(){
//     return {
//   	 	restrict: 'E',
//   	 	templateUrl: 'modules/core/views/insights-details.client.view.html',
//   	 	replace: true
//   	}
// });
'use strict';
//Blogs service used to communicate Blogs REST endpoints
angular.module('blogs').factory('Blogs', [
  '$resource',
  function ($resource) {
    return $resource('blogs/:blogId', { blogId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Blogs service used to communicate Blogs REST endpoints
angular.module('blogs').factory('Comments', [
  '$resource',
  function ($resource) {
    return $resource('blogs/:blogId/comments/:commentId', {
      blogId: '@blogId',
      commentId: '@_id'
    }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Blogs service used to communicate Blogs REST endpoints
angular.module('blogs').factory('Likes', [
  '$resource',
  function ($resource) {
    return $resource('blogs/:blogId/:choice', {}, {
      save: {
        method: 'POST',
        params: {
          choice: 'like',
          blogId: '@blogId'
        }
      }
    });
  }
]);// angular.module('blogs').factory('SelectedBlog', ['$resource',
// 	function($resource) {
// 		return $resource('blogs/:blogId/selected', { blogId: '@blog._id'
// 		}, {
// 			update: {
// 				method: 'PUT'
// 			}
// 		});
// 	}
// ]);
'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('about-us', {
      url: '/about-us',
      templateUrl: 'modules/core/views/about-us.client.view.html'
    }).state('about-you', {
      url: '/about-you',
      templateUrl: 'modules/core/views/about-you.client.view.html'
    }).state('contact', {
      url: '/contact',
      templateUrl: 'modules/core/views/connect.client.view.html'
    }).state('testimonial', {
      url: '/testimonial',
      templateUrl: 'modules/core/views/testimonial.client.view.html'
    }).state('community', {
      url: '/community',
      templateUrl: 'modules/core/views/insights.home.client.view.html'
    }).state('clientsComments', {
      url: '/clientsComments',
      templateUrl: 'modules/core/views/clientsComments.client.view.html'
    }).state('download', {
      url: '/download',
      templateUrl: 'modules/core/views/downloads.client.view.html'
    }).state('our_vision', {
      url: '/our_vision',
      templateUrl: 'modules/core/views/vision.client.view.html'
    }).state('customer-story', {
      url: '/customer-success-story',
      templateUrl: 'modules/core/views/customer-story.view.html'
    }).state('community_blog', {
      url: '/community/2013-10-1-avoidable-mistakes',
      templateUrl: 'modules/core/views/insights.2013-10-1-avoidable-mistakes.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  '$state',
  'Authentication',
  'anchorSmoothScroll',
  '$anchorScroll',
  '$location',
  'Resumes',
  '$upload',
  '$timeout',
  function ($scope, $state, Authentication, anchorSmoothScroll, $anchorScroll, $location, Resumes, $upload, $timeout) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.$state = $state;
    $scope.gotoElement = function (eID) {
      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);
      $scope.selected = eID;
    };
    $scope.onFileSelect = function ($files) {
      $scope.files = $files;
      // $scope.imageFiles = [];
      $scope.stringFiles = [];
      if ($scope.files) {
        for (var i in $scope.files) {
          if ($scope.files[0].type === 'application/pdf' || $scope.files[0].type === 'application/msword' || $scope.files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || $scope.files[i].size < 600000) {
            $scope.correctFormat = true;
          } else {
            alert('error');
            alert('Wrong file format...');
            $scope.correctFormat = false;
          }
          $scope.start(i);
        }
      }
    };
    $scope.start = function (indexOftheFile) {
      var formData = {
          key: $scope.files[indexOftheFile].name,
          AWSAccessKeyID: 'AKIAIURTOHJ7C726ULIA',
          acl: 'private',
          policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImdlbmVzaXNtaWNybyJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgeyJhY2wiOiAicHJpdmF0ZSJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogICAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgNTI0Mjg4MDAwXQogIF0KfQ==',
          signature: 'JZSwCIPMywXkxDN+PwPg23DuXiM=',
          filename: $scope.files[indexOftheFile].name,
          'Content-Type': $scope.files[indexOftheFile].type
        };
      $scope.imageFiles[indexOftheFile] = $upload.upload({
        url: 'https://genesismicro.s3-us-west-2.amazonaws.com',
        method: 'POST',
        headers: { 'Content-Type': $scope.files[indexOftheFile].type },
        data: formData,
        file: $scope.files[indexOftheFile]
      });
      console.log(indexOftheFile);
      $scope.imageFiles[indexOftheFile].then(function (response) {
        $timeout(function () {
          $scope.loading = false;
          //alert('uploaded');
          var resumeURL = 'https://genesismicro.s3-us-west-2.amazonaws.com' + $scope.files[indexOftheFile].name;
          $scope.stringFiles.push(resumeURL);
        });
      }, function (response) {
        console.log(response);
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
        alert('Connection Timed out');
      }, function (evt) {
      });  // console.log($scope.imageFiles[indexOftheFile]);
           // $scope.imageFiles[indexOftheFile].xhr(function(xhr) {
           //     //alert('xhr');
           // });
    };
    $scope.uploadResume = function () {
      // $scope.onFileSelect($files);
      var resume = new Resumes({
          name: this.name,
          resumeURL: $scope.stringFiles
        });
      resume.$save(function (response) {
        $location.path('/');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
        console.log('saved');
      });
    };
    $scope.showDetails = false;
    $scope.showLocation = function () {
      $scope.displayLocation = !$scope.displayLocation;
    };
    $scope.hideLocation = function () {
      $scope.displayLocation = false;
      console.log('hide');
    };
    //    $(window).scroll(function() {
    //  clearTimeout(scrollTimeout);
    //  if ($(window).scrollTop() > 400) {
    //      scrollTimeout = setTimeout(function(){$('a.scroll-top:hidden').fadeIn()}, 100);
    //  } 
    //  else {
    //      scrollTimeout = setTimeout(function(){$('a.scroll-top:visible').fadeOut()}, 100);
    //  }
    // });
    // $('#sidebar').scrollspy();
    $scope.gotoTop = function () {
      $location.hash('top');
      $anchorScroll();
    };
  }
]);
angular.module('core').controller('InsightController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
  }
]);
angular.module('core').controller('InsightDetailsController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
  }
]);// angular.module('core').controller('InsightController', ['$scope', 'Authentication', 
// 	function($scope, Authentication){
// 	}
// ]);
'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['user'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic || this.menus[menuId].isPublic,
            roles: roles || this.defaultRoles,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);
angular.module('core').service('anchorSmoothScroll', function () {
  this.scrollTo = function (eID) {
    // This scrolling function 
    // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20)
      speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY += step;
        if (leapY > stopY)
          leapY = stopY;
        timer++;
      }
      return;
    } else {
      for (var i = startY; i > stopY; i -= step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY)
          leapY = stopY;
        timer++;
      }
    }
    return;
    function currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset)
        return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop)
        return document.body.scrollTop;
      return 0;
    }
    function elmYPosition(eID) {
      var elm = document.getElementById(eID);
      var y = elm.offsetTop;
      var node = elm;
      while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      }
      return y;
    }
  };
});'use strict';
//Blogs service used to communicate Blogs REST endpoints
angular.module('core').factory('Resumes', [
  '$resource',
  function ($resource) {
    return $resource('resumes/:resumeId', { resumeId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      if ($scope.securityCode === '12t$*&$)t2g') {
        console.log($scope.securityCode);
        $scope.credentials.role = 'admin';
        console.log($scope.credentials.role);
      } else {
        $scope.credentials.role = 'user';
      }
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/admin/blogs');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        console.log($scope.authentication.user);
        if ($scope.authentication.user.role === 'admin') {
          $location.path('/admin/blogs');
        } else {
          //And redirect to the index page
          $location.path('/');
        }
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);