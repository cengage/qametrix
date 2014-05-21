'use strict';

angular.module('sapience.charts').controller('ProductSelectorController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $http.get('sapience/products').success(function(data) {
    	$scope.products = [];
        data.forEach(function(product, index) {
            var product = {'id': index, 'selected':false, 'name': product.name,'platform': product.platform};
            $scope.products.push(product);
        });
    });
    
    
    $http.get('sapience/platforms').success(function(data) {
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
    
    $scope.productSelected = function(application) {
	    
        $rootScope.$broadcast('productSelection', application);
    };
    
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