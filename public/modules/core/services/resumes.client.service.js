'use strict';

//Blogs service used to communicate Blogs REST endpoints
angular.module('core').factory('Resumes', ['$resource',
    function($resource) {
        return $resource('resumes/:resumeId', {
            resumeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
angular.module('core').factory('ContactForms', ['$resource',
	function($resource){
		return $resource('/contactForm', {},	
		{
			update: {
				method: 'PUT'
			}
		});
	}
]);

