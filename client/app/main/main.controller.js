'use strict';

angular.module('directoryApp')
  .controller('MainCtrl', function ($scope, Auth, $location, Users) {
    $scope.users = Users.data;
  });
