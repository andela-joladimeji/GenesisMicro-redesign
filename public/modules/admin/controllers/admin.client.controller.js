// enable  and disable comment
// display user.name
// or commentor
'use strict';

// Lists controller
angular.module('admin').controller('AdminController', ['$scope', 'Authentication', '$stateParams', '$location',
  function($scope, Authentication, $stateParams, $location) {

    $scope.user = Authentication.user;

    // Create new user

]);

