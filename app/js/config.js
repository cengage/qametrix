'use strict';

//Setting up route
angular.module('sapience').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
            .state('all artifacts', {
                url: '/artifacts',
                templateUrl: 'views/artifacts/list.html'
            })
            .state('artifact versions by name', {
                url: '/artifacts/:artifactName',
                templateUrl: 'views/artifact/versions.html'
            })
            .state('artifact by name and version', {
                url: '/artifacts/:artifactName/:version',
                templateUrl: 'views/artifact/view.html'
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('sapience').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
