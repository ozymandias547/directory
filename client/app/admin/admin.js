'use strict';

angular.module('directoryApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminCtrl',
                resolve: {
                    TagData: function($stateParams, $http) {
                        return $http.get('/api/tags');
                    }
                }
            });
    });
