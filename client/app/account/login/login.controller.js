'use strict';

angular.module('directoryApp')
    .controller('LoginCtrl', function($scope, Auth, $location, $http, $window) {
        $scope.user = {};
        $scope.errors = {};
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.login = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function() {
                        
                        if($window.ga) {
                            $window.ga('send', 'event', 'account', 'login', $scope.user.email, 4);
                        }

                        $location.path('/directory');
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

    });
