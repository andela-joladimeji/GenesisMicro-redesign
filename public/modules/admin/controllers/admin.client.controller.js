'use strict';

// Lists controller
angular.module('admin').controller('AdminController', ['$scope', 'Authentication', '$stateParams', '$location', 'Resumes',
    function($scope, Authentication, $stateParams, $location, Resumes) {

        $scope.user = Authentication.user;
        
        $scope.resumeData = Resumes.query().$promise.then(function(response) {
            $scope.resumes = response;
        });

    }

]);
