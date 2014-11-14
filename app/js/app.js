'use strict';

// Declare app level module which depends on views, and components
angular.module('writtenOffApp', [
  'ngRoute',
  'writtenOffApp.view1',
  'writtenOffApp.view2',
  'writtenOffApp.view3',
  'writtenOffApp.welcome',
  'writtenOffApp.gameScreen',
  'writtenOffApp.newGame',
  'writtenOffApp.createGame',
  'ui.bootstrap',
  'ui.bootstrap.showErrors',
  'LocalStorageModule'
]).
config(['$routeProvider','localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  $routeProvider.otherwise({redirectTo: '/welcome'});
  localStorageServiceProvider.setPrefix('writtenOffApp');
  localStorageServiceProvider.setStorageType('localStorage');
  localStorageServiceProvider.setNotify(true, true);
  localStorageServiceProvider.setStorageCookie(90, '/');
    
}]);

