'use strict';

angular.module('sapience.system').controller('myProfileController', ['$scope' , '$http', function($scope, $http) {
	
	console.log('inside My Profile Controller');
	
	$scope.updateUserProfile=function(userSession) {
		
		console.log('inside update method '+ userSession.password);
		
		$http.put('sapience/users/'+userSession._id,userSession).then(function (data) {

			console.log('data updated successfully '+data[0]);
        	
        })
        
	}	
    }
]);
