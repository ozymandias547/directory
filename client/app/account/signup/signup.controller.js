'use strict';

angular.module('directoryApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
     $scope.passwordsDontMatch = false;

    $scope.register = function(form) {
      $scope.submitted = true;

      if ($scope.user.password !== $scope.user.password2) {
        $scope.passwordsDontMatch = true;
        return;
      }

      if(form.$valid) {
        Auth.createUser({
          firstname: $scope.user.firstname,
          lastname: $scope.user.lastname,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/directory');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
