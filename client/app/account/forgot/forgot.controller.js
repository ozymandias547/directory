'use strict';

angular.module('directoryApp')
    .controller('ForgotCtrl', function($scope, User, Auth) {
        $scope.errors = {};
        $scope.section = "Forgot Password";
        $scope.forgotPassword = function(form) {
            Auth.forgotPassword(form.email)
                .then(function() {
                    $scope.message = 'An email has been sent with a new password.';
                });
            
        };
    });
