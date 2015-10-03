'use strict';

angular.module('directoryApp')
  .controller('ResetCtrl', function($scope, User, Auth, $location) {

    console.log($location);

    var resetToken = $location.$$search.resetToken;
    $scope.section = "Reset Password";

    $scope.resetPassword = function(form) {

      $scope.error = null;

      if (form.password.$modelValue !== form.repeatPassword.$modelValue) {
        $scope.error = "Passwords do not match.";
        return;
      }

      Auth.resetPassword(form.password.$modelValue, resetToken)
        .then(function() {
          $location.path('/');
        })
        .catch(function(e) {
          $scope.error = e;
        })

    };
  });
