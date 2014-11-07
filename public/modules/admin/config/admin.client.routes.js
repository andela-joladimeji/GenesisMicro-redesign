'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider',
    function($stateProvider) {
        // Lists state routes
        $stateProvider.
        state('resume', {
            url: '/admin/resume',
            templateUrl: 'modules/admin/views/resume.client.view.html'
        }).
        state('signInUser', {
            url: '/admin',
            templateUrl: 'modules/users/views/signin.client.view.html'
        });
    }
]);
