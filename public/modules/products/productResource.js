angular.module('sapience.masters').factory('ProductResource', ['$resource', function($resource){
    return $resource('/sapience/products/:id');
}]);