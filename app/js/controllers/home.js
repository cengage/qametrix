'use strict';

angular.module('sapience.system').controller('HomeController', ['$scope', 'Global',
    function($scope, Global) {
        $scope.global = Global;
    }
]);
