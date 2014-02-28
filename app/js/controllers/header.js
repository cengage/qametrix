'use strict';

angular.module('artifactGraph.system').controller('HeaderController', ['$scope', 'Global',
    function($scope, Global) {
        $scope.global = Global;

        $scope.menu = [{
            'title': 'Artifacts',
            'link': 'artifacts'
        }];

        $scope.isCollapsed = false;
    }
]);
