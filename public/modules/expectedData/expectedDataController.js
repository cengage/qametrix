'use strict';

angular.module('sapience.system').controller('expectedDataController', ['$scope' , '$http', function($scope, $http) {
	
	$scope.expectedDataFormModel={
    		selectedProductId : '',
    		selectedCategoryId : '',
    		selectedExpression : '',
    		selectedExpectedValue : ''
    };

    $http.get('/crud/platforms').success(function(data) {
        $scope.platforms = [];
        data.forEach(function(nplatform, index) {
            var platform = {id: nplatform._id, name: nplatform.name};
            $scope.platforms.push(platform);
        });
    });
    
    $scope.abc='';
    $scope.saveSelectedProducts = function(product){
    	$("#select_product").text(product.name);
    	$scope.selectedProductId=product.id;
    	console.log('inside save select product method : '+ product.id);
    };
    
    $scope.saveSelectedCategory = function(category){
    	$("#select_category").text(category.name);
    	$scope.selectedCategoryId=category.id;
    	console.log('inside save select category method : '+ category.id);

    	$http.get('/crud/product/'+$scope.selectedProductId+'/category/'+$scope.selectedCategoryId).success(function(productCategory) {
    		$scope.fetechedOjbect=productCategory;
    		
    		$scope.fetechedOjbect.forEach(function(prodCat){
				console.log('inside for loop');
				$scope.indexId=true;
				$scope.loginbox=false;
				$scope.fetchedPCategoryObject=prodCat;
    		});
    		$scope.expectedDataFormModel.selectedExpectedValue=$scope.fetchedPCategoryObject.expectedValue;
    		$scope.expectedDataFormModel.selectedExpression=$scope.fetchedPCategoryObject.expression;
    	});
    };
    
    $scope.fetchProducts=function(platform){
    	$("#select_platform").text(platform.name);
    	console.log('in fetch product, selected platform is : ' + platform);
    	 $http.get('/crud/products').success(function(data) {
    	    	$scope.products = [];
    	    	$scope.filteredProducts=[];
    	        data.forEach(function(product, index) {
    	            var product = {'id': product._id, 'selected':false, 'name': product.name,'platform': product.platform};
    	           // $scope.products.push(product);
    	            console.log('dsfsdfsfs : ' + platform.id);
    	            if(product.platform==platform.id){
    	    			$scope.filteredProducts.push(product);
    	    		}
    	        });
    	    });
    };
    
    $scope.submitExpectedData=function(expectedDataFormModel){
    	expectedDataFormModel.selectedProduct=$scope.selectedProductId;
    	expectedDataFormModel.selectedCategory=$scope.selectedCategoryId;
    	console.log('Selected Product is : '+expectedDataFormModel.selectedProduct);
    	console.log('Selected Category is : '+expectedDataFormModel.selectedCategory);
    	console.log('Selected Expected value is : '+expectedDataFormModel.selectedExpectedValue);
    	console.log('Selected Expected Expression is : '+expectedDataFormModel.selectedExpression);
    	$http.get('/crud/product/'+expectedDataFormModel.selectedProduct+'/category/'+expectedDataFormModel.selectedCategory).success(function(productCategory) {
    		$scope.fetechedOjbect=productCategory;
    		
    		$scope.fetechedOjbect.forEach(function(prodCat){
				console.log('inside for loop');
				$scope.indexId=true;
				$scope.loginbox=false;
				$scope.fetchedPCategoryObject=prodCat;
    		});
    		$scope.fetchedPCategoryObject.expectedValue=expectedDataFormModel.selectedExpectedValue;
    		$scope.fetchedPCategoryObject.expression=expectedDataFormModel.selectedExpression;
    		console.log('product feteched object is: '+ $scope.fetchedPCategoryObject);
    		console.log('product feteched object id is: '+ $scope.fetchedPCategoryObject._id);
    		
    		 $http.put('/crud/productCategory/' + $scope.fetchedPCategoryObject._id, $scope.fetchedPCategoryObject).success(function(data) {

    	            console.log('data updated successfully ' + data.expectedValue);
    	           console.log('updated successfully the object is : '+ data);
    	        })
    	})
    }

    //
    $http.get('/crud/connectors').success(function(data) {
        $scope.connectors = [];
        data.forEach(function(nconnector, index) {
            var connector = {id: nconnector._id, name: nconnector.name};
            $scope.connectors.push(connector);
        });
    });

    //
    $scope.fetchCategories=function(connector){
    $("#select_connector").text(connector.name);
   	 $http.get('/crud/categories').success(function(data) {
   		$scope.filteredCategories=[];
   	    	$scope.categories1 = [];
   	        data.forEach(function(category, index) {
   	            var category = {'id': category._id, 'name': category.name,'connector': category.connector};
   	           // $scope.categories1.push(category);
   	         if(category.connector==connector.id){
   	   			$scope.filteredCategories.push(category);
   	   		}
   	        });
   	    });
   /*	console.log('categories'+$scope.categories1[0]);
   	
   	console.log('categoryy'+category);
   	console.log('indexxx'+index);
   	console.log('$scope.categories1'+$scope.categories1);
   	$scope.filteredCategories=[];
   	$scope.categories1.forEach(function(category,index){
   		if(category.connector==connector.id){
   			$scope.filteredCategories.push(category);
   		}
   	});*/
   };
    
    //

}]);