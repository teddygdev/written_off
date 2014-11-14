'use strict';



angular.module('writtenOffApp').factory('util', function(localStorageService) {
        return {
            save: function(param) {
             localStorageService.set('keyVars', LZString.compressToBase64(JSON.stringify(param)));
            },

            load: function() {
             return JSON.parse(LZString.decompressFromBase64(localStorageService.get('keyVars')));
            }
       };
        
    });

