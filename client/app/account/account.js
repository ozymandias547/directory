'use strict';

angular.module('directoryApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile/:userId',
                templateUrl: 'app/account/profile/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    ProfileData: function($stateParams, User) {
                        return User.get({
                            id: $stateParams.userId
                        }).$promise;
                    },
                    TagData: function($stateParams, $http) {
                        return $http.get('/api/tags');
                    }
                }
            })
            .state('forgot', {
                url: '/forgot',
                templateUrl: 'app/account/forgot/forgot.html',
                controller: 'ForgotCtrl'
            })
            .state('resetPassword', {
              url: '/resetPassword',
              templateUrl: 'app/account/forgot/reset.html',
              controller: 'ResetCtrl'
            })
            .state('login', {
                url: '/',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsCtrl',
                authenticate: true
            });
    });
