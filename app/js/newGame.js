'use strict';

angular.module('writtenOffApp.newGame', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/newgame', {
    templateUrl: 'partials/newGame.html',
    controller: 'NewGameCtrl'
  });
}])

.controller('NewGameCtrl', [function() {



}]);