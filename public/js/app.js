'use strict';

angular.module('sapience', ['ngCookies',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'sapience.system',
    'sapience.charts',
    'sapience.masters'
]);

angular.module('sapience.system', ['sapience.system.user', 'sapience.system.notification']);
angular.module('sapience.charts', []);
angular.module('sapience.masters', []);

angular.module('sapience').factory('lodash', ['$window',
    function($window) {
        return $window._;
    }
]).factory('Global', ['$window',
    function($window) {
        return {
            user: $window.user,
            authenticated: !!$window.user
        };
    }
]);
