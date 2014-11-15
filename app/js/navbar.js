'use strict';

angular.module('writtenOffApp.navbar', [])





.controller('navbarCtrl', ['$scope','$rootScope', function($scope, $rootScope) {

$scope.changeSpeed = function(str) {
        if (str=='x1') {
          $scope.x1=true;
          $scope.x2=false;
          $scope.x4=false;
          $scope.x8=false;
          $rootScope.multiplier=1;
        }
        else if (str=='x2') {
          $scope.x1=false;
          $scope.x2=true;
          $scope.x4=false;
          $scope.x8=false;
          $rootScope.multiplier=2;
        }
        else if (str=='x4') {
          $scope.x1=false;
          $scope.x2=false;
          $scope.x4=true;
          $scope.x8=false;
          $rootScope.multiplier=4;
        }
        else {
          $scope.x1=false;
          $scope.x2=false;
          $scope.x4=false;
          $scope.x8=true;
          $rootScope.multiplier=8;
        }
    };
$scope.changeSpeed('x1');
}]);