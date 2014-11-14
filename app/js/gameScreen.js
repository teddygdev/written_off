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

    
    $scope.save = function(param) {
        util.save(param);
    }

    $scope.load = function() {
       $rootScope.vars=util.load();
    }  

    $scope.doCollapse = function() {
        $scope.isCollapsedGather = !$scope.checkModel.manualGather;
    };

    $scope.gameLoopTick = function() {
      $rootScope.vars.food++;
      $rootScope.vars.elapsedTicks++;
      if ($rootScope.vars.elapsedTicks%30 == 0) $scope.save($rootScope.vars);
        
    };
   
    $scope.doCollapse();
    

    $scope.hideBadFoodVal = true;
    $scope.hideGoodFoodVal = true;
    $scope.foodAttempts = 0;
    $scope.load();

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
        $timeout(compensation, delta);
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
