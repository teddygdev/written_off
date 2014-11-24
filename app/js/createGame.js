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
$scope.radioClimate = 'Mild';
$scope.randomName();
$scope.randomTown();



$scope.startNewGame = function() {
        $scope.$broadcast('show-errors-check-validity');
		  if ($scope.userForm.$valid) {
		  	$scope.resetValues();
		  	$scope.save($rootScope.vars, "vars");
		  	$scope.save($rootScope.varsConst, "varsConst");
		  	$scope.save($rootScope.jobs, "jobs");
		  	$scope.save($rootScope.buildings, "buildings");
		  	$scope.save($rootScope.adults, "adults");
		  	$scope.save($rootScope.children, "children");
		  	$scope.save($rootScope.students, "students");
		  	$scope.save($rootScope.defaultTemp, "defaultTemp");
		  	$scope.save($rootScope.conditions, "conditions");
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
		  "coats": 0,
		  "tools": 0,
		  "herbs": 0,
		  "wool": 0,
		  "leather": 0,
		  "population": 0,
		  "adultsNum": 0,
		  "studentsNum": 0,
		  "childrenNum": 0,
		  "todayWeather": 20
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
		  	"cleric": 0,

		  	"builderMax": 0,
		  	"farmerMax": 0,
		  	"gathererMax": 0,
		  	"fishermanMax": 0,
		  	"hunterMax": 0,
		  	"woodcutterMax": 0,
		  	"foresterMax": 0,
		  	"minerMax": 0,
		  	"stonecutterMax": 0,
		  	"herbalistMax": 0,
		  	"blacksmithMax": 0,
		  	"tailorMax": 0,
		  	"vendorMax": 0,
		  	"teacherMax": 0,
		  	"doctorMax": 0,
		  	"clericMax": 0
		};

		$rootScope.buildings=
		{
			"house": 0,
			"barn": 0,
			"storage": 0,
			"school": 0

		}

		$rootScope.conditions=
		{
			"starving": 0,
			"freezing": 0,
			"sick": 0
		}

		$rootScope.adults=[];
		$rootScope.students=[];
		$rootScope.children=[];

		if ($scope.radioDifficulty=='Easy') {
			$rootScope.vars.adultsNum=12;
			$rootScope.vars.studentsNum=0;
			$rootScope.vars.childrenNum=12;
			$rootScope.vars.population=24;
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
			$rootScope.vars.population=20;
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
			$rootScope.vars.population=16;
			$rootScope.vars.food=1200;
			$rootScope.vars.firewood=100;
			$rootScope.vars.tools=20;
			$rootScope.vars.coats=20;
		}

		//http://www.usclimatedata.com/
		//if t<10 -> use firewood
		//if t<0  -> use 2xfirewood
		//if t<-10-> use 3xfirewood

		//if no coat
		//if >20 no coat needed
		//if 15-20 75% productivity
		//if 10-15 50% productivity
		//if 5-10 25% productivity
		//if 0-5  10% productivity
		//if <0   5% productivity
		if ($scope.radioClimate=='Fair') {
			$rootScope.defaultTemp= 
			[
				{'max':10, 'min':0}, //jan tennessee
				{'max':13, 'min':2},
				{'max':18, 'min':7},
				{'max':23, 'min':12},
				{'max':27, 'min':17},
				{'max':32, 'min':21},
				{'max':33, 'min':23},
				{'max':33, 'min':23},
				{'max':30, 'min':18},
				{'max':24, 'min':12},
				{'max':17, 'min':7},
				{'max':11, 'min':2}

			];
		}
		else if ($scope.radioClimate=='Mild') {
			$rootScope.defaultTemp= 
			[
				{'max':-1, 'min':-8}, //jan michigan 
				{'max':0, 'min':-8},
				{'max':7, 'min':-3},
				{'max':14, 'min':3},
				{'max':20, 'min':8},
				{'max':26, 'min':14},
				{'max':28, 'min':16},
				{'max':27, 'min':15},
				{'max':23, 'min':11},
				{'max':16, 'min':5},
				{'max':8, 'min':0},
				{'max':1, 'min':-5}
			];
		}
		else if ($scope.radioClimate=='Harsh') {
			$rootScope.defaultTemp= 
			[
				{'max':-6, 'min':-16}, //jan north dakota 
				{'max':-4, 'min':-13},
				{'max':3, 'min':-7},
				{'max':13, 'min':-1},
				{'max':19, 'min':6},
				{'max':24, 'min':12},
				{'max':28, 'min':15},
				{'max':27, 'min':13},
				{'max':21, 'min':8},
				{'max':13, 'min':1},
				{'max':3, 'min':-7},
				{'max':-5, 'min':-14}
			];
		}
		else { //frigid
			$rootScope.defaultTemp= 
			[
				{'max':-17, 'min':-27}, //jan alaska fairbanks
				{'max':-12, 'min':-25},
				{'max':-4, 'min':-19},
				{'max':7, 'min':-6},
				{'max':16, 'min':3},
				{'max':22, 'min':10},
				{'max':23, 'min':11},
				{'max':19, 'min':8},
				{'max':13, 'min':2},
				{'max':1, 'min':-9},
				{'max':-12, 'min':-21},
				{'max':-15, 'min':-25}
			];
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
			//console.log(binGender);
			if (binGender==1) var gender = 'male';
			else var gender = 'female';
			$rootScope.children.push({'name':faker.name.firstName(), 'age':randomAge, 'gender':gender, 'birthday':birthdayDay});
		}
		
    };    



}]);





  
  

