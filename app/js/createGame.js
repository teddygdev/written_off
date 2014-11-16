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

		$rootScope.jobs=
        {
        	"unemployed":0,
          	"builder": 0,
		  	"farmer": 0,
		  	"gatherer": 0,
		  	"fisherman": 0,
		  	"hunter": 0,
		  	"woodcutter": 0,
		  	"forester": 0,
		  	"miner": 0,
		  	"stonecutter": 0,
		  	"herbalist": 0,
		  	"blacksmith": 0,
		  	"tailor": 0,
		  	"vendor": 0,
		  	"teacher": 0,
		  	"doctor": 0,
		  	"cleric": 0
		};

		$rootScope.buildings=
		{
			"house": 0,
			"barn": 0,
			"storage": 0,
			"school": 0

		}

		$rootScope.adults=[];
		$rootScope.students=[];
		$rootScope.children=[];

		if ($scope.radioDifficulty=='Easy') {
			$rootScope.vars.adultsNum=12;
			$rootScope.vars.studentsNum=0;
			$rootScope.vars.childrenNum=12;
			$rootScope.vars.food=2400;
			$rootScope.vars.logs=150;
			$rootScope.vars.stone=70;
			$rootScope.vars.iron=50;
			$rootScope.vars.firewood=400;
			$rootScope.vars.tools=50;
			$rootScope.vars.coats=40;
		}
		else if ($scope.radioDifficulty=='Medium') {
			$rootScope.vars.adultsNum=10;
			$rootScope.vars.studentsNum=0;
			$rootScope.vars.childrenNum=10;
			$rootScope.vars.food=1800;
			$rootScope.vars.logs=120;
			$rootScope.vars.stone=60;
			$rootScope.vars.iron=40;
			$rootScope.vars.firewood=200;
			$rootScope.vars.tools=30;
			$rootScope.vars.coats=30;
		}
		else {
			$rootScope.vars.adultsNum=8;
			$rootScope.vars.studentsNum=0;
			$rootScope.vars.childrenNum=8;
			$rootScope.vars.food=1200;
			$rootScope.vars.firewood=100;
			$rootScope.vars.tools=20;
			$rootScope.vars.coats=20;
		}

		for (var i=0; i < $rootScope.vars.adultsNum; i++) {
			var randomAge=Math.floor((Math.random() * 10) + 1) + 20;
			var birthdayDay=Math.floor((Math.random() * 363) + 1);
			var binGender=Math.floor((Math.random() * 2) + 1);
			if (binGender==1) var gender = 'male';
			else var gender = 'female';
			$rootScope.adults.push({'name':faker.name.firstName(), 'age':randomAge, 'gender':gender, 'birthday':birthdayDay, 'job':'none'});
			$rootScope.jobs.unemployed++;
		}

		for (var i=0; i < $rootScope.vars.childrenNum; i++) {
			var randomAge=Math.floor((Math.random() * 10) + 1) + 1;
			var birthdayDay=Math.floor((Math.random() * 363) + 1);
			var binGender=Math.floor((Math.random() * 2) + 1);
			if (binGender==1) var gender = 'male';
			else var gender = 'female';
			$rootScope.children.push({'name':faker.name.firstName(), 'age':randomAge, 'gender':gender, 'birthday':birthdayDay});
		}
		
    };    



}]);





  
  

