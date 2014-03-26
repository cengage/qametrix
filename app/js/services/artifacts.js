'use strict';

//Artifacts service used for artifacts REST endpoint
angular.module('sapience').factory('Artifacts', ['$resource',
    function($resource) {
        return $resource('artifacts/:artifactName/:version', {
            artifactName: '@_id',
            version: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            all: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data) {
                    var artifacts = [];
                    angular.forEach(angular.fromJson(data), function(artifact) {
                        artifacts.push({
                            name: artifact
                        });
                    });
                    return artifacts;
                }
            },
            versions: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data) {
                    var artifacts = [];
                    angular.forEach(angular.fromJson(data), function(version) {
                        artifacts.push({
                            text: version
                        });
                    });
                    return artifacts;
                }
            }
        });
    }
]);
