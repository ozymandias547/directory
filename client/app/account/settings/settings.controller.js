'use strict';

angular.module('directoryApp')
    .controller('SettingsCtrl', function($scope, User, Auth, $location) {
        $scope.errors = {};
        $scope.section = "Settings";
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.changePassword = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function() {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch(function() {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                        $scope.message = '';
                    });
            }
        };
         $scope.logout = function() {
     Auth.logout();
     $location.path('/');
 };

    });
