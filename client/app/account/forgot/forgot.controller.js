'use strict';

angular.module('directoryApp')
    .controller('ForgotCtrl', function($scope, User, Auth) {

        $scope.section = "Forgot Password";

        $scope.forgotPassword = function(form) {

          $scope.error = null;

          Auth.forgotPassword(form.email.$modelValue)
                .then(function() {
                    $scope.message = 'An email has been sent with a new password.';
                })
                .catch(function(e) {
                  $scope.error = e;
                })

        };
    });
