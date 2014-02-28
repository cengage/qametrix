'use strict';

angular.module('artifactGraph.system').controller('HomeController', ['$scope', 'Global',
    function($scope, Global) {
        $scope.global = Global;
    }
]);
