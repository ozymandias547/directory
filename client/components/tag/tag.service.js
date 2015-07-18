'use strict';

angular.module('directoryApp')
    .factory('Tag', function($resource) {
        return $resource('/api/tags/:id/:controller', {
            id: '@_id'
        }, {
            'update': {
                method: 'PUT',
            }
        });
    });
