'use strict';

angular.module('directoryApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentUserId = Auth.getCurrentUser()._id;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    
     $scope.logout = function() {
          Auth.logout();
          $location.path('/');
        };
    
  });