'use strict';

angular.module('writtenOffApp.gameScreen', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'partials/gameScreen.html',
    controller: 'gameScreenCtrl'
  });
}])

.controller('gameScreenCtrl', ['$scope', '$timeout', '$rootScope', 'util',  function($scope, $timeout, $rootScope, util) {
    $scope.checkModel = {
        manualGather: false,
        middle: false,
        right: false
    };
    $scope.save = function(param, name) {
        util.save(param, name);
    }

    $scope.load = function(name) {
       $rootScope[name]=util.load(name);
       if (name=="vars") {
            $scope.date = moment($rootScope.vars.date);
            $scope.datePretty = $scope.date.format('[Year] YYYY MMM Do');
       }
    }

    $scope.loadAll = function() {
        $scope.load("vars");
        $scope.load("varsConst");
        $scope.load("jobs");
        $scope.load("buildings");
        $scope.load("adults");
        $scope.load("children");
        $scope.load("students");
        $scope.load("defaultTemp");
    };  

     $scope.saveAll = function() {
      $rootScope.vars.date = $scope.date;
      $scope.save($rootScope.vars, "vars");
      $scope.save($rootScope.varsConst, "varsConst");
      $scope.save($rootScope.jobs, "jobs");
      $scope.save($rootScope.buildings, "buildings");
      $scope.save($rootScope.adults, "adults");
      $scope.save($rootScope.children, "children");
      $scope.save($rootScope.students, "students");
      $scope.save($rootScope.defaultTemp, "defaultTemp");
    };  

    $scope.random = function(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    $scope.doCollapse = function() {
        $scope.isCollapsedGather = !$scope.checkModel.manualGather;
    };

    $scope.gameLoopTick = function() {
      if ($scope.date.dayOfYear() != $scope.dayOld) { //new day
          $scope.dayOld=$scope.date.dayOfYear();
          //$rootScope.vars.todayWeather=Math.floor((Math.random() * $rootScope.defaultTemp[$scope.monthOld].max) + $rootScope.defaultTemp[$scope.monthOld].min);
          if (($rootScope.defaultTemp[$scope.monthOld].max>=0)&&($rootScope.defaultTemp[$scope.monthOld].min>=0)) {
            //$rootScope.vars.todayWeather=Math.floor((Math.random() * $rootScope.defaultTemp[$scope.monthOld].max) + $rootScope.defaultTemp[$scope.monthOld].min);
            $rootScope.vars.todayWeather=$scope.random($rootScope.defaultTemp[$scope.monthOld].max, $rootScope.defaultTemp[$scope.monthOld].min);
          }
          else if (($rootScope.defaultTemp[$scope.monthOld].max<0)&&($rootScope.defaultTemp[$scope.monthOld].min<0)) {
            //$rootScope.vars.todayWeather=Math.floor((Math.random() * Math.abs($rootScope.defaultTemp[$scope.monthOld].min)) + Math.abs($rootScope.defaultTemp[$scope.monthOld].max));
            $rootScope.vars.todayWeather=$scope.random(Math.abs($rootScope.defaultTemp[$scope.monthOld].min), Math.abs($rootScope.defaultTemp[$scope.monthOld].max));
            $rootScope.vars.todayWeather *= -1;
          }
          else if (($rootScope.defaultTemp[$scope.monthOld].max>=0)&&($rootScope.defaultTemp[$scope.monthOld].min<0)) {
            $rootScope.vars.todayWeather=Math.floor(Math.random() * ($rootScope.defaultTemp[$scope.monthOld].max + Math.abs($rootScope.defaultTemp[$scope.monthOld].min))) - Math.abs($rootScope.defaultTemp[$scope.monthOld].min);
            if ($rootScope.vars.todayWeather >= 0) $rootScope.vars.todayWeather++;
          }


          console.log($rootScope.vars.todayWeather);
          //console.log("newday");

          if ($scope.date.month() != $scope.monthOld) {//new month
              $scope.monthOld=$scope.date.month();
              console.log("month " + $scope.monthOld);
              console.log("max:" + $rootScope.defaultTemp[$scope.monthOld].max);
              console.log("min:" + $rootScope.defaultTemp[$scope.monthOld].min);
          }

          if ($scope.date.week() != $scope.weekOld) {//new week
              $scope.weekOld=$scope.date.week();
              console.log("week " + $scope.weekOld);
              $scope.saveAll();
          }
      }
      $scope.date.add((($scope.timeStep/100)*15*$rootScope.multiplier), 'm');
      $scope.datePretty = $scope.date.format('[Year] YYYY MMM Do');
    };
    
    $scope.clickFood = function() {
    	var random = Math.floor((Math.random() * 100) + 1);
    	if (random < 10) {
    		$scope.food = $scope.food + 1;
    		$scope.hideGoodFoodVal = false;
    		$scope.hideBadFoodVal = true;
    		$scope.foodAttempts = 0;	
    	}
    	else {
    		$scope.hideBadFoodVal = false;
    		$scope.hideGoodFoodVal = true;
    		$scope.foodAttempts = $scope.foodAttempts + 1;
    	} 
        
    };

    $scope.hideBadFood = function() {
    	$scope.hideBadFoodVal=true;
        
    };

    $scope.hideGoodFood = function() {
    	$scope.hideGoodFoodVal=true;
        
    };

    $scope.clearGatheringNotications = function() {
        $scope.hideBadFoodVal=true;
        $scope.hideGoodFoodVal=true;
    };

    $scope.fpsMinus = function() {
        if ($scope.fps>1) $scope.fps--;
        $scope.timeStep = 1000/$scope.fps;
        //console.log($scope.timeStep/100);
    };

    $scope.fpsPlus = function() {
        if ($scope.fps<10) $scope.fps++;
        $scope.timeStep = 1000/$scope.fps;
        //console.log($scope.timeStep/100);
    };

    
    //to deal with page changes
    $scope.$on("$destroy", function( event ) {
      $timeout.cancel($scope.timer);
    });



    $scope.doCollapse();
    $scope.optionsCollapsed = true;
    $scope.fps=10;

    
    //console.log($rootScope.adults);
    //console.log($rootScope.children);
    //console.log($rootScope.jobs.unemployed);

    $scope.hideBadFoodVal = true;
    $scope.hideGoodFoodVal = true;
    $scope.foodAttempts = 0;
    $scope.loadAll();
    $scope.saveAll();

    $scope.dayOld=$scope.date.dayOfYear();
    $scope.monthOld=$scope.date.month();
    $scope.weekOld=$scope.date.week();

    //$rootScope.vars.todayWeather=Math.floor((Math.random() * $rootScope.defaultTemp[$scope.monthOld].max) + $rootScope.defaultTemp[$scope.monthOld].min);
    //console.log($rootScope.vars.todayWeather);
    //console.log("month " + $scope.monthOld);
    //console.log($scope.dayOld);
    //console.log($rootScope.defaultTemp[0].max);

    //
    //
    //
    // game loop
    //
    //
    //
    //



    $scope.timeStep = 1000/$scope.fps; // time step (ms)
    //var limit = 100; #optional limit
    
    var pcDate, delta = $scope.timeStep, time, newtime;
    var c4 = 0;
    
    var compcount = 0;
    var compensation = function() {
      pcDate = new Date();
      c4++;
      newtime = pcDate.getTime();
      delta += $scope.timeStep - (newtime - time);
      while(delta < 0) {
        delta+=$scope.timeStep;
        compcount++;
        //
        //calculations for compensation
        //        
        //console.log("count");
        $scope.gameLoopTick();
        c4++;
      };
      time = newtime;
      //
      //calculations inside windows
      //
      //console.log("count2");
      $scope.gameLoopTick();
      //if(c4 < limit) $timeout(compensation, delta); #optional limit
     $scope.timer = $timeout(compensation, delta);
    };
    pcDate = new Date();
    time = pcDate.getTime();
    $timeout(compensation, $scope.timeStep);    

    //
    //
    //
    // game loop end
    //
    //
    //
    //  

 
    

}]);

