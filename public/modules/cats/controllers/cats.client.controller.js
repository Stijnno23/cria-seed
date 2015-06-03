/*jslint node: true */
/*global $, angular */
'use strict';

angular.module('cats').controller('CatsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cats',
    function ($scope, $stateParams, $location, Authentication, Cats) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            var cats = new Cats({
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
            cats.$save(function (response) {
                $location.path('cats/' + response._id);
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

        $scope.remove = function (cat) {
            var i;
            if (cat) {
                cat.$remove();

                for (i in $scope.cats) {
                    if ($scope.cats[i] === cat) {
                        $scope.cats.splice(i, 1);
                    }
                }
            } else {
                $scope.cat.$remove(function () {
                    $location.path('cats');
                });
            }
        };

        $scope.update = function () {
            var cat = $scope.cat;

            cat.$update(function () {
                $location.path('cats/' + cat._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.cats = Cats.query();
        };

        $scope.findOne = function () {
            $scope.cat = Cats.get({
                catId: $stateParams.catId
            });


        };
    }
    ]);
