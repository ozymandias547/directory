'use strict';

angular.module('directoryApp')
    .factory('User', function($resource) {
        return $resource('/api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            forgotPassword: {
                method: 'GET',
                params: {
                    email: 'email'
                }
            },
            getMe: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            },
            'update': {
                method: 'PUT',
            }
        });
    });
