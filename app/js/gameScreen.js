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
       $rootScope.vars=util.load(name);
       if (name=="vars") {
        $scope.date = moment($rootScope.vars.date);
        $scope.datePretty = $scope.date.format('[Year] YYYY MMM Do');
       }
       
    }  

    $scope.doCollapse = function() {
        $scope.isCollapsedGather = !$scope.checkModel.manualGather;
    };

    $scope.gameLoopTick = function() {
      //console.log("tick-tock");
      $rootScope.vars.food++;
      $rootScope.vars.elapsedTicks++;
      if ($rootScope.vars.elapsedTicks%30 == 0) $scope.save($rootScope.vars, "vars");
      $scope.date.add(1, 'd');
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

    //to deal with page changes
    $scope.$on("$destroy", function( event ) {
      $timeout.cancel($scope.timer);
    });

    $scope.doCollapse();
    

    $scope.hideBadFoodVal = true;
    $scope.hideGoodFoodVal = true;
    $scope.foodAttempts = 0;
    $scope.load("vars");

    //
    //
    //
    // game loop
    //
    //
    //
    //



      var timeStep = 500; // time step (ms)
      //var limit = 100; #optional limit
      
      var pcDate, delta = timeStep, time, newtime;
      var c4 = 0;
      
      var compcount = 0;
      var compensation = function() {
        pcDate = new Date();
        c4++;
        newtime = pcDate.getTime();
        delta += timeStep - (newtime - time);
        while(delta < 0) {
          delta+=timeStep;
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
      $timeout(compensation, timeStep);    

      //
      //
      //
      // game loop end
      //
      //
      //
      //  

 
    

}]);

