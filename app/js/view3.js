'use strict';

angular.module('writtenOffApp.view3', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'partials/view3.html',
    controller: 'View3Ctrl'
  });
}])


.controller('View3Ctrl', [function($scope) {

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

        function preload () {

           // game.load.image('logo', 'phaser.png');

        }

        function create () {

           // var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
           // logo.anchor.setTo(0.5, 0.5);

        }

}]);

 
var TabsDemoCtrl = function ($scope) {
  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      alert('You\'ve selected the alert tab!');
    });
  };
};