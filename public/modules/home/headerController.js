'use strict';

angular.module('sapience.system').controller('HeaderController', ['$scope', function($scope) {

        $scope.menu = [{
            'title': 'Home',
            'state': 'HOME'
        },{
            'title': 'Dashboard',
            'state': 'DASHBOARD'
        },{
            'title': 'Products',
            'state': 'PRODUCT-LIST'
        }];

        $scope.isCollapsed = true;
    }
]);
