'use strict';

angular.module('artifactGraph.artifacts').controller('ArtifactsController', ['$scope', '$stateParams', '$location', 'Global', 'Artifacts',
    function($scope, $stateParams, $location, Global, Artifacts) {

        $scope.global = Global;

        $scope.create = function() {
            var artifact = new Artifacts({
                title: this.title,
                content: this.content
            });
            artifact.$save(function(response) {
                $location.path('artifacts/' + response._id);
            });

            this.title = '';
            this.content = '';
        };

        $scope.remove = function(artifact) {
            if (artifact) {
                artifact.$remove();

                for (var i in $scope.artifacts) {
                    if ($scope.artifacts[i] === artifact) {
                        $scope.artifacts.splice(i, 1);
                    }
                }
            } else {
                $scope.versions.$remove();
                $location.path('artifacts');
            }
        };

        $scope.update = function() {
            var artifact = $scope.versions;
            if (!artifact.updated) {
                artifact.updated = [];
            }
            artifact.updated.push(new Date().getTime());

            artifact.$update(function() {
                $location.path('artifacts/' + artifact._id);
            });
        };

        $scope.all = function() {
            Artifacts.all(function(artifacts) {
                $scope.artifacts = artifacts;
            });
        };

        $scope.versions = function() {
            Artifacts.versions({
                artifactName: $stateParams.artifactName
            }, function(versions) {
                $scope.artifact = {
                    name: $stateParams.artifactName,
                    versions: versions
                };
            });
        };

        $scope.findOne = function() {
            Artifacts.get({
                artifactName: $stateParams.artifactName,
                version: $stateParams.version
            }, function(artifact) {
                $scope.artifact = artifact;
            });
        };
    }
]);
