'use strict';

angular.module('sapience.system').controller('myProfileController', ['$scope' , '$http', function($scope, $http) {
 
 console.log('inside My Profile Controller');
 
 $scope.updateUserProfile=function(userSession) {
  
  $http.put('sapience/users/'+userSession._id,userSession).success(function (data) {

   console.log('data updated successfully '+data.firstName);
         $scope.userSession=data;
        })
        
 } 
    }
]);