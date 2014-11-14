'use strict';



angular.module('writtenOffApp').factory('util', function(localStorageService) {
        return {
            save: function(param, name) {
             localStorageService.set(name, LZString.compressToBase64(JSON.stringify(param)));
            },

            load: function(name) {
             return JSON.parse(LZString.decompressFromBase64(localStorageService.get(name)));
            }
       };
        
    });

