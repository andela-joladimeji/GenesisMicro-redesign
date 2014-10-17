'use strict';


angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication', 'anchorSmoothScroll', '$anchorScroll', '$location',
	function($scope, $state, Authentication, anchorSmoothScroll, $anchorScroll, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.$state = $state;
	

		$scope.gotoElement = function (eID){	 
	      // call $anchorScroll()
	       anchorSmoothScroll.scrollTo(eID);
	       $scope.selected = eID;

	    };

	    $scope.showDetails = false;
	    console.log($scope.showDetails);
	 //    $(window).scroll(function() {
		// 	clearTimeout(scrollTimeout);
		// 	if ($(window).scrollTop() > 400) {
		// 		scrollTimeout = setTimeout(function(){$('a.scroll-top:hidden').fadeIn()}, 100);
		// 	} 
		// 	else {
		// 		scrollTimeout = setTimeout(function(){$('a.scroll-top:visible').fadeOut()}, 100);
		// 	}
		// });
		

	    
	    $scope.gotoTop = function(){
	    	$location.hash('top');
	    	$anchorScroll();
	    };
	}
]);

