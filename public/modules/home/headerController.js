'use strict';

angular.module('sapience.system').controller('HeaderController', ['$scope', function($scope) {

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        },{
            'title': 'Products',
            'link': 'products'
        }];

        $scope.isCollapsed = false;
    }
]);
