'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
  function($stateProvider) {
    // Lists state routes
    $stateProvider.
    state('signInUser', {
      url: '/admin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    });
  }
]);

