'use strict';

angular.module('sapience.charts').controller('ProductSelectorController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $http.get('/crud/products').success(function(data) {
    	$scope.products = [];
        data.forEach(function(product, index) {
            var product = {'id': index, 'selected':false, 'name': product.name,'platform': product.platform};
            $scope.products.push(product);
        });
    });
    
    $scope.actualDataModel=false;
    $scope.targetDataModel=false;
    
    $http.get('/crud/platforms').success(function(data) {
        $scope.platforms = [];
        data.forEach(function(platform, index) {
        	console.log('Initial platform id is : '+platform._id);
            var platform = {id: platform._id, name: platform.name};
            $scope.platforms.push(platform);
        });
    });
    
    $scope.fetchProducts=function(platform){
    	
    	$scope.filteredProducts=[];
    	$scope.products.forEach(function(product,index){
    		if(product.platform==platform.id){
    			$scope.filteredProducts.push(product);
    		}
    	});
    };
    
    // function for Actual Data
    $scope.productSelected = function(application, actualDataModel) {
	    
    	console.log('actual data model value is : '+actualDataModel);
        $rootScope.$broadcast('productSelection', application,'forActualData');
    };
    
    // function for target Data
    $scope.targetProductSelected=function(application, targetDataModel){
    	
    	console.log('target data model value is : '+targetDataModel);
    	if(targetDataModel==false){
    		application.selected=false;
    	}
    	
    	console.log('is application data selected : '+application.selected);
    	$rootScope.$broadcast('productSelection', application,'forTargetData');
    }
    
    $scope.practices=[{
        'id': '1',
        'name': 'Take the work to the team'
    },{
        'id': '2',
        'name': 'Team Practices'
    },{
        'id': '3',
        'name': 'Appropriate Pairing'
    },{
        'id': '4',
        'name': 'Exploratory Testing'
    }];
    
}]);