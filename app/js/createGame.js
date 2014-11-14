'use strict';

angular.module('writtenOffApp.createGame', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/creategame', {
    templateUrl: 'partials/createGame.html',
    controller: 'CreateGameCtrl'
  });
}])


.controller('CreateGameCtrl', ['$scope', '$location', '$rootScope', 'util', function($scope, $location, $rootScope, util) {

$scope.save = function(param, name) {
        util.save(param, name);
    }

$scope.randomName = function() {
        $scope.userName=faker.name.firstName();
    }

$scope.randomTown = function() {
        $scope.userTown=faker.address.city();
    }


$scope.radioDifficulty = 'Medium';
$scope.radioGender = 'Male';
$scope.radioClimate = 'Fair';
$scope.randomName();
$scope.randomTown();



$scope.startNewGame = function() {
        $scope.$broadcast('show-errors-check-validity');
		  if ($scope.userForm.$valid) {
		  	$scope.resetValues();
		  	$scope.save($rootScope.vars, "vars");
		  	$scope.save($rootScope.varsConst, "const");
		    $location.url('/game');
		  }
     
    };

$scope.resetValues = function() {
		$rootScope.varsConst=
		{
			"rulerName": $scope.userName,
		  	"townName": $scope.userTown,
		  	"gender": $scope.radioGender,
		  	"climate": $scope.radioClimate
		};

        $rootScope.vars=
        {
          "date":moment("03-01-0001 12:00 +0000", "MM-DD-YYYY HH:mm Z"),		
       	  "elapsedTicks": 0,
		  "food": 0,
		  "logs": 0,
		  "stone": 0,
		  "iron": 0,
		  "firewood": 0,
		  "hideCoats": 0,
		  "woolCoats": 0,
		  "warmCoats": 0,
		  "coats": 0,
		  "coal": 0,
		  "tools": 0,
		  "wool": 0,
		  "leather": 0,
		  "men": 0,
		  "women": 0,
		  "villagers": 0,
		  "adults": 0,
		  "children": 0,
		  "girls": 0,
		  "boys": 0,
		  "farms": 0,
		  "farmers": 0,
		  //"families": 0
		};

		if ($scope.radioDifficulty=='Easy') {
			$rootScope.vars.adults=12;
			$rootScope.vars.children=12;
			$rootScope.vars.food=2400;
			$rootScope.vars.logs=150;
			$rootScope.vars.stone=70;
			$rootScope.vars.iron=50;
			$rootScope.vars.firewood=400;
			$rootScope.vars.tools=50;
			$rootScope.vars.coats=40;
		}
		else if ($scope.radioDifficulty=='Medium') {
			$rootScope.vars.adults=10;
			$rootScope.vars.children=5;
			$rootScope.vars.food=1800;
			$rootScope.vars.logs=120;
			$rootScope.vars.stone=60;
			$rootScope.vars.iron=40;
			$rootScope.vars.firewood=200;
			$rootScope.vars.tools=30;
			$rootScope.vars.coats=30;
		}
		else {
			$rootScope.vars.adults=8;
			$rootScope.vars.children=8;
			$rootScope.vars.food=1200;
			$rootScope.vars.firewood=100;
			$rootScope.vars.tools=20;
			$rootScope.vars.coats=20;
		}
		
    };    



}]);





  
  

