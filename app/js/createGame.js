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
$scope.radioAge = 'x5';
$scope.randomName();
$scope.randomTown();



$scope.startNewGame = function() {
        $scope.$broadcast('show-errors-check-validity');
		  if ($scope.userForm.$valid) {
		  	$scope.resetValues();
		  	$scope.save($rootScope.vars, "vars");
		  	$scope.save($rootScope.varsConst, "varsConst");
		  	$scope.save($rootScope.jobs, "jobs");
		  	$scope.save($rootScope.jobsMax, "jobsMax");
		  	$scope.save($rootScope.buildings, "buildings");
		  	$scope.save($rootScope.adults, "adults");
		  	$scope.save($rootScope.children, "children");
		  	$scope.save($rootScope.students, "students");
		  	$scope.save($rootScope.babies, "babies");
		  	$scope.save($rootScope.queue, "queue");
		  	$scope.save($rootScope.defaultTemp, "defaultTemp");
		  	$scope.save($rootScope.conditions, "conditions");
		  	$scope.save($rootScope.capacity, "capacity");
		  	$scope.save($rootScope.gamelog, "gamelog");
		    $location.url('/game');

		  }
     
    };

$scope.resetValues = function() {
		$rootScope.varsConst=
		{
			"rulerName": $scope.userName,
		  	"townName": $scope.userTown,
		  	"gender": $scope.radioGender,
		  	"climate": $scope.radioClimate,
		  	"aging": $scope.radioAge
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
		  "herbs": 50,
		  "leather": 0,
		  "population": 0,
		  "adultsNum": 0,
		  "studentsNum": 0,
		  "childrenNum": 0,
		  "haveRoof": 0,
		  "todayWeather": 20,
		  "education": 0,
		  "health": 100,
		  "day": 1,
		  "productivityEdu": 100,
		  "productivityCoats": 100,
		  "productivityHealth": 100,
		  "productivityTools": 100,
		  "productivityCold": 100,
		  "buildingLimit": 20,
		  "rawLimit": 2000,
		  "matLimit": 2000,
		  "hitRawLimit": false,
		  "hitMatLimit": false,
		  "exploreVal": 0,
		  "exploreMax": 100
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
		  	"teacher": 0
		};

		$rootScope.jobsMax=
		{
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
		  	"teacherMax": 0
		}

		$rootScope.buildings=
		{
			"house": {"name":"Wooden House","have":0, "logs": 16, "stone": 8, "iron": 0, "type": "Shelter", "cap":5, "pass":"house"},
			"houseStone": {"name":"Stone House","have":0, "logs": 24, "stone": 40, "iron": 8, "type": "Shelter", "cap":10, "pass":"houseStone"},
			"storagebarn": {"name":"Storage Barn","have":0, "logs": 48, "stone": 16, "iron": 0, "type": "General Storage", "cap":4000, "pass":"storagebarn"},
			"stockpile": {"name":"Stock Pile","have":0, "logs": 4, "stone": 2, "iron": 0, "type": "Raw Materials", "cap":1500, "pass":"stockpile"},
			"school": {"name":"School House","have":0, "logs": 50, "stone": 16, "iron": 16, "type": "Education", "cap":20, "pass":"school"},
			"farmBean": {"name":"Small Farm: Bean Crop","have":0, "logs": 4, "stone": 0, "iron": 0, "type": "Food", "cap":1, "pass":"farmBean"},
			"farmPotato": {"name":"Large Farm: Potato Crop","have":0, "logs": 10, "stone": 0, "iron": 0, "type": "Food", "cap":2, "pass":"farmPotato"},
			"orchardApple": {"name":"Apple Orchard","have":0, "logs": 10, "stone": 0, "iron": 0, "type": "Food", "cap":4, "pass":"orchardApple"},
			"fishingDock": {"name":"Fishing Dock","have":0, "logs": 30, "stone": 16, "iron": 0, "type": "Food", "cap":4, "pass":"fishingDock"},
			"huntingCabin": {"name":"Hunting Cabin","have":0, "logs": 54, "stone": 12, "iron": 0, "type": "Food", "cap":4, "pass":"huntingCabin"},
			"gathererHut": {"name":"Gatherer's Hut","have":0, "logs": 30, "stone": 12, "iron": 0, "type": "Food", "cap":4, "pass":"gathererHut"},
			"woodCutterBuilding": {"name":"Wood Cutter","have":0, "logs": 24, "stone": 8, "iron": 0, "type": "Production", "cap":1, "pass":"woodCutterBuilding"},
			"lodge": {"name":"Forester's Lodge","have":0, "logs": 32, "stone": 12, "iron": 0, "type": "Gathering", "cap":4, "pass":"lodge"},
			"herbHut": {"name":"Herbalist's Hut","have":0, "logs": 30, "stone": 12, "iron": 0, "type": "Gathering", "cap":2, "pass":"herbHut"},
			"blacksmith": {"name":"Blacksmith","have":0, "logs": 55, "stone": 32, "iron": 32, "type": "Production", "cap":1, "pass":"blacksmith"},
			"tailor": {"name":"Tailor","have":0, "logs": 32, "stone": 48, "iron": 16, "type": "Production", "cap":1, "pass":"tailor"},
			"mine": {"name":"Iron Mine","have":0, "logs": 48, "stone": 68, "iron": 0, "type": "Gathering", "cap":30, "pass":"mine"},
			"quarry": {"name":"Stone Quarry","have":0, "logs": 32, "stone": 80, "iron": 40, "type": "Gathering", "cap":30, "pass":"quarry"},
			"headquarters": {"name":"Builder's Headquarters","have":0, "logs": 20, "stone": 10, "iron": 0, "type": "Building", "cap":5, "pass":"headquarters"}
		}

		$rootScope.capacity=
		{
			"students": 0,
			"heatEf": 1.5

		}

		$rootScope.conditions=
		{
			"starving": 0,
			"freezing": 0
		}

		$rootScope.gamelog=[];
		$rootScope.gamelog.push({'date':'Year 0001 Mar 1st', 'event':'Game Started'});
		$rootScope.adults=[];
		$rootScope.students=[];
		$rootScope.children=[];		
    	$rootScope.babies= [];  //make rootscope
    	$rootScope.queue = [];  //make rootscope

    	if ($scope.radioAge=='Real') $rootScope.vars.day=1;
    	else if ($scope.radioAge=='x10') $rootScope.vars.day=10;
    	else $rootScope.vars.day=5;

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
			$rootScope.vars.education=12;
			$rootScope.vars.rawLimit=300;
			$rootScope.vars.matLimit=3000;

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
			$rootScope.vars.education=10;
			$rootScope.vars.rawLimit=250;
			$rootScope.vars.matLimit=2500;
		}
		else if ($scope.radioDifficulty=='Biblical') {
			$rootScope.vars.adultsNum=2;
			$rootScope.vars.studentsNum=0;
			$rootScope.vars.childrenNum=0;
			$rootScope.vars.population=2;
			$rootScope.vars.food=300;
			$rootScope.vars.logs=30;
			$rootScope.vars.stone=20;
			$rootScope.vars.iron=10;
			$rootScope.vars.firewood=50;
			$rootScope.vars.tools=5;
			$rootScope.vars.coats=5;
			$rootScope.vars.education=2;
			$rootScope.vars.rawLimit=100;
			$rootScope.vars.matLimit=1000;
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
			$rootScope.vars.education=8;
			$rootScope.vars.rawLimit=150;
			$rootScope.vars.matLimit=1500;
		}

		//http://www.usclimatedata.com/
		//if t<10 -> use firewood
		//if t<0  -> use 1.5xfirewood
		//if t<-10-> use 2xfirewood

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



		if ($scope.radioDifficulty=='Biblical') {
			$rootScope.adults.push({'name':'Adam', 'age':18, 'gender':'male', 'birthday':1, 'education':true});
			$rootScope.adults.push({'name':'Eve', 'age':18, 'gender':'female', 'birthday':5, 'education':true});
		}
		else {
			for (var i=0; i < $rootScope.vars.adultsNum; i++) {
				var randomAge=Math.floor((Math.random() * 10) + 1) + 20;
				var birthdayDay=Math.floor((Math.random() * 363) + 1);
				var binGender=Math.floor((Math.random() * 2) + 1);
				if (binGender==1) var gender = 'male';
				else var gender = 'female';
				$rootScope.adults.push({'name':faker.name.firstName(), 'age':randomAge, 'gender':gender, 'birthday':birthdayDay, 'education':true});
				$rootScope.jobs.unemployed++;
			}

			for (var i=0; i < $rootScope.vars.childrenNum; i++) {
				var randomAge=Math.floor((Math.random() * 6) + 1) + 1;
				var birthdayDay=Math.floor((Math.random() * 363) + 1);
				var binGender=Math.floor((Math.random() * 2) + 1);
				//console.log(binGender);
				if (binGender==1) var gender = 'male';
				else var gender = 'female';
				$rootScope.children.push({'name':faker.name.firstName(), 'age':randomAge, 'gender':gender, 'birthday':birthdayDay, 'education':false});
			}
		}	
		
    };    



}]);





  
  

