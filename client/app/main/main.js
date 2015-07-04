'use strict';

angular.module('directoryApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/directory',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
        	Users:  function($http, Auth){
            return $http({method: 'GET', url: '/api/users/getPublic'});
	        },
        }
      });
  });

  