'use strict';

angular.module('sapience.charts').controller('ProductSelectorController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $http.get('sapience/products').success(function(data) {
        $scope.products = [];
        data.forEach(function(product, index) {
            var product = {id: index, selected: false, name: product.name};
            $scope.products.push(product);
        });
    });

    $scope.productSelected = function(application) {
        $rootScope.$broadcast('productSelection', application);
    }
}]);