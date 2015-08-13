angular
    .module('directoryApp')
    .service('analytics', [
        '$rootScope', '$window', '$location',
        function($rootScope, $window, $location) {
           $rootScope
        .$on('$stateChangeSuccess',
            function(event){
 
                if (!$window.ga)
                    return;
 
                $window.ga('send', 'pageview', { page: $location.path() });
        });
        }
    ]);
