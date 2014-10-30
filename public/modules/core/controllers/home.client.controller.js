'use strict';


angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication', 'anchorSmoothScroll', '$anchorScroll', '$location', 'Resumes', '$upload', '$timeout',
    function($scope, $state, Authentication, anchorSmoothScroll, $anchorScroll, $location, Resumes, $upload, $timeout) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.$state = $state;


        $scope.gotoElement = function(eID) {
            // call $anchorScroll()
            anchorSmoothScroll.scrollTo(eID);
            $scope.selected = eID;

        };



        $scope.onFileSelect = function($files) {
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

        $scope.start = function(indexOftheFile) {

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
                headers: {
                    'Content-Type': $scope.files[indexOftheFile].type
                },
                data: formData,
                file: $scope.files[indexOftheFile]
            });
            console.log(indexOftheFile);
            $scope.imageFiles[indexOftheFile].then(function(response) {
                $timeout(function() {
                    $scope.loading = false;
                    //alert('uploaded');
                    var resumeURL = 'https://genesismicro.s3-us-west-2.amazonaws.com' + $scope.files[indexOftheFile].name;
                    $scope.stringFiles.push(resumeURL);
                });
            }, function(response) {
                console.log(response);

                if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                alert('Connection Timed out');
            }, function(evt) {

            });

            // console.log($scope.imageFiles[indexOftheFile]);

            // $scope.imageFiles[indexOftheFile].xhr(function(xhr) {
            //     //alert('xhr');
            // });

        };

    

        $scope.uploadResume = function() {
            // $scope.onFileSelect($files);
            var resume = new Resumes({
                name: this.name,
                resumeURL: $scope.stringFiles
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
