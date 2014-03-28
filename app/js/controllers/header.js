'use strict';

angular.module('sapience.system').controller('HeaderController', ['$scope', 'Global',
    function($scope, Global) {
        $scope.global = Global;

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];

        $scope.isCollapsed = false;
    }
]);
