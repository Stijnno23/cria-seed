'use strict';

angular.module('dogs').controller('DogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dogs',
    function($scope, $stateParams, $location, Authentication, Dogs) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            var dogs = new Dogs({
                title: this.title,
                content: this.content
            });
            dogs.$save(function(response) {
                $location.path('dogs/' + response._id);

                $scope.title = '';
                $scope.content = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function(dogs) {
            if (dogs) {
                dogs.$remove();

                for (var i in $scope.dogs) {
                    if ($scope.dogs[i] === article) {
                        $scope.dogs.splice(i, 1);
                    }
                }
            } else {
                $scope.dogs.$remove(function() {
                    $location.path('dogs');
                });
            }
        };

        $scope.update = function() {
            var dogs = $scope.dogs;

            dogs.$update(function() {
                $location.path('dogs/' + dogs._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.dogs = Dogs.query();
        };

        $scope.findOne = function() {
            $scope.dogs = Dogs.get({
                dogs: $stateParams.dogId
            });
        };
    }
]);
