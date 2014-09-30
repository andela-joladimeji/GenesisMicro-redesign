'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'anchorSmoothScroll', '$anchorScroll', '$location',
	function($scope, Authentication, anchorSmoothScroll, $anchorScroll, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	

		$scope.gotoElement = function (eID){	 
	      // call $anchorScroll()
	       anchorSmoothScroll.scrollTo(eID);
	    };

	    $scope.gotoTop = function(){
	    	$location.hash('top');
	    	$anchorScroll();
	    };
	}
]);

