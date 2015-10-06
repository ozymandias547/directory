'use strict';

angular.module('directoryApp')
  .factory('MainService', function Auth() {
   
    var state = {
      selectedProfiles : [],
      viewMode: "tile"
    }

   return {
      setState: function(key, data) {
        state[key] = data;
      },
      getState: function(key) {
        return state[key];
      }
   }
  });
