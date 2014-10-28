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


	 //    $scope.locations= [
	 //    	{
	 //    		area: ikoyi,
	 //    		address: 10, ikoyi
		//     },
		//     {
		//     	area: Yaba,
		//     	address: 102, herbert macsulay
		//     },
		//     {
		//     	area: eypt,
		//     	address: kairo
		//     }
		// ];

	    

	    $scope.showDetails = false;
	    $scope.showLocation= function(){
	    	$scope.displayLocation=!$scope.displayLocation;
	    
	    };
	    
	    $scope.hideLocation = function(){
	    	$scope.displayLocation=false;
	    	console.log("hide");	
	    };
	  
	 	//    $(window).scroll(function() {
		// 	clearTimeout(scrollTimeout);
		// 	if ($(window).scrollTop() > 400) {
		// 		scrollTimeout = setTimeout(function(){$('a.scroll-top:hidden').fadeIn()}, 100);
		// 	} 
		// 	else {
		// 		scrollTimeout = setTimeout(function(){$('a.scroll-top:visible').fadeOut()}, 100);
		// 	}
		// });
		// $('#sidebar').scrollspy();

	    
	    $scope.gotoTop = function(){
	    	$location.hash('top');
	    	$anchorScroll();
	    };
	}
]);

angular.module('core').controller('InsightController', ['$scope', 'Authentication', 
	function($scope, Authentication){

	}
]);

angular.module('core').controller('InsightDetailsController', ['$scope', 'Authentication', 
	function($scope, Authentication){

	}
]);