'use strict';

var app = angular.module('Admin',[]);

app.controller('AdminSelectorController', ['$scope', function($scope) {
	$scope.types = [
		{
			'title': 'Platforms',
			'state': 'PLATFORMS'
		},{
			'title': 'Products',
			'state': 'PRODUCTS'
		},{
			'title': 'Metrics',
			'state': 'METRICS'
		}];
}]);