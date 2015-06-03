/*jslint node: true */
/*global $, angular */
"use strict";

angular.module('dogs').controller('DogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dogs',
    function ($scope, $stateParams, $location, Authentication, Dogs) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            var dogs = new Dogs({
                picture: this.picture,
                age: this.age,
                eyecolor: this.eyecolor,
                name: this.name,
                gender: this.gender,
                size: this.size,
                breedgroup: this.breedgroup,
                kids: this.kids,
                about: this.about
            });
            dogs.$save(function (response) {
                $location.path('dogs/' + response._id);
                $scope.picture = '';
                $scope.age = '';
                $scope.eyecolor = '';
                $scope.name = '';
                $scope.gender = '';
                $scope.size = '';
                $scope.breedgroup = '';
                $scope.kids = '';
                $scope.about = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (dog) {
            var i;
            if (dog) {
                dog.$remove();

                for (i in $scope.dogs) {
                    if ($scope.dogs[i] === dog) {
                        $scope.dogs.splice(i, 1);
                    }
                }
            } else {
                $scope.dog.$remove(function () {
                    $location.path('dogs');
                });
            }
        };

        $scope.update = function () {
            var dog = $scope.dog;

            dog.$update(function () {
                $location.path('dogs/' + dog._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.dogs = Dogs.query();
        };

        $scope.findOne = function () {
            $scope.dog = Dogs.get({
                dogId: $stateParams.dogId
            });


        };
    }
    ]);
