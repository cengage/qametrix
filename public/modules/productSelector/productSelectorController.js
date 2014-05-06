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
    };
    
    $scope.platforms= [{
        'id': 'Omni',
        'name': 'Omni'
    },{
        'id': 'Legacy',
        'name': 'Legacy'
    },{
        'id': 'Ocean',
        'name': 'Ocean'
    },{
        'id': 'Pangea',
        'name': 'Pangea'
    }];
    
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