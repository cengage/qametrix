'use strict';

//Setting up route
angular.module('sapience').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider.state('PRODUCT-LIST', {
            url: '/products',
            templateUrl: '/modules/products/views/productList.html'
        }).state('DASHBOARD', {
            url: '/dashboard',
            views: {
                '@': {
                    templateUrl: '/modules/dashboard/views/dashboard.html'
                },
                'sidebar@DASHBOARD': {
                    templateUrl: '/modules/productSelector/views/productSelector.html'
                }
            }
        }).state('home', {
            url: '/',
            templateUrl: '/modules/home/views/home.html'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('sapience').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
