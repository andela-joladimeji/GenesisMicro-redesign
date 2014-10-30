'use strict';


angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication', 'anchorSmoothScroll', '$anchorScroll', '$location', 'Resumes',
    function($scope, $state, Authentication, anchorSmoothScroll, $anchorScroll, $location, Resumes) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.$state = $state;


        $scope.gotoElement = function(eID) {
            // call $anchorScroll()
            anchorSmoothScroll.scrollTo(eID);
            $scope.selected = eID;

        };



        // upload resumes
        $scope.onFileSelect = function($files) {
            console.log('file submit');
            //initial variables
            $scope.uploadProgress = 0;
            $scope.files = $files;
            $scope.stringFiles = [];

            
            // console.log($scope.files);
            if ($scope.files) {
                for (var i in $scope.files) {

                    // if ($scope.files[i].type === 'text/jpeg' || $scope.files[i].type === 'image/png') {
                    //Create new instance of filerader
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        //Load the Image string into path
                        console.log(e);
                        $scope.stringFiles.push({
                            path: e.target.result
                        });
                    };
                    reader.readAsDataURL($scope.files[i]);
                    $scope.correctFormat = true;
                }
                console.log($scope.stringFiles);
            };

        };

        $scope.uploadResume = function() {
            // $scope.onFileSelect($files);
            var resume = new Resumes ({
                file: $scope.stringFiles
            });

            resume.$save(function(response) {
                $location.path('/');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
                console.log("saved");
            });

        };




        $scope.showDetails = false;
        $scope.showLocation = function() {
            $scope.displayLocation = !$scope.displayLocation;

        };

        $scope.hideLocation = function() {
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


        $scope.gotoTop = function() {
            $location.hash('top');
            $anchorScroll();
        };
    }
]);

angular.module('core').controller('InsightController', ['$scope', 'Authentication',
    function($scope, Authentication) {

    }
]);

angular.module('core').controller('InsightDetailsController', ['$scope', 'Authentication',
    function($scope, Authentication) {

    }
]);
