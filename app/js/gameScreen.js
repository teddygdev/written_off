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
        $scope.load("jobsMax");
        $scope.load("buildings");
        $scope.load("adults");
        $scope.load("children");
        $scope.load("students");
        $scope.load("defaultTemp");
        $scope.load("conditions");
        $scope.load("capacity");
    };  

     $scope.saveAll = function() {
      $rootScope.vars.date = $scope.date;
      $scope.save($rootScope.vars, "vars");
      $scope.save($rootScope.varsConst, "varsConst");
      $scope.save($rootScope.jobs, "jobs");
      $scope.save($rootScope.jobsMax, "jobsMax");
      $scope.save($rootScope.buildings, "buildings");
      $scope.save($rootScope.adults, "adults");
      $scope.save($rootScope.children, "children");
      $scope.save($rootScope.students, "students");
      $scope.save($rootScope.defaultTemp, "defaultTemp");
      $scope.save($rootScope.conditions, "conditions");
      $scope.save($rootScope.capacity, "capacity");
    };  

    $scope.random = function(max, min) { //max is not inclusive
      return Math.floor(Math.random() * (max - min) + min);
    }

    $scope.doCollapse = function() {
        $scope.isCollapsedGather = !$scope.checkModel.manualGather;
    };

    $scope.kill = function(num, death, type, index) {
      for(var i=0; i < num; i++) {
        if (type == undefined) var type = $scope.random(4,1);
        if ((type == 1)&&($rootScope.vars.adultsNum<1)) type=2;
        if ((type == 2)&&($rootScope.vars.studentsNum<1)) type=3;

        if ($rootScope.vars.population>0) {
          $rootScope.vars.population--;
          if (type == 1) {
            if ($rootScope.vars.adultsNum>0) {
              $rootScope.vars.adultsNum--;
              var toDie = $scope.random($rootScope.adults.length, 0);
              if (index != undefined) toDie=index;
                 ///fix type of death
              
              //if ($rootscope.jobs.unemployed > 0) $rootscope.jobs.unemployed--;
              //else {
              //}
              var cnt=0;
              for (var i in $rootScope.jobs) {
                if ($rootScope.jobs[i] > 0) {
                  cnt++;
                }
              }
              var stop = $scope.random(cnt, 0);
              var cnt2 = 0;
              for (var i in $rootScope.jobs) {
                if ($rootScope.jobs[i] > 0) {
                  if (cnt2==stop) {
                    $rootScope.jobs[i]--;
                    console.log($rootScope.adults[toDie].name + ' the ' + i + death + ' at age ' + $rootScope.adults[toDie].age);
                  }
                  cnt2++;
                }
              }
              $rootScope.adults.splice(toDie, 1);
            }
            else {
              i--;
              $rootScope.vars.population++;
            }
          }
          else if (type == 2) {
            if ($rootScope.vars.studentsNum>0) {
              $rootScope.vars.studentsNum--;
              var toDie = $scope.random($rootScope.students.length, 0);
              console.log($rootScope.students[toDie].name + ' the student'+ death + ' at age ' + $rootScope.students[toDie].age);
              $rootScope.students.splice(toDie, 1);
            }
            else {
              i--;
              $rootScope.vars.population++;
            }
          }
          else {
            if ($rootScope.vars.childrenNum>0) {
              $rootScope.vars.childrenNum--;
              var toDie = $scope.random($rootScope.adults.length, 0);
              console.log($rootScope.children[toDie].name + ' the child'+ death + ' at age ' + $rootScope.children[toDie].age);
              $rootScope.children.splice(toDie, 1);
            }
            else {
              i--;
              $rootScope.vars.population++;
            }
          }
        }
      }
    }

    $scope.ageOneDay = function() {
      //console.log($rootScope.adults[0].birthday);
      for (var i = 0; i < $rootScope.adults.length; i++) {
        $rootScope.adults[i].birthday++;
        if ($rootScope.adults[i].birthday > 365) {
          $rootScope.adults[i].birthday=1;
          $rootScope.adults[i].age++;
          if ($rootScope.adults[i].age>20) {
            $scope.kill(1, ' died from old age', 1, i);
          }

        }
      }
      for (var i = 0; i < $rootScope.students.length; i++) {
        $rootScope.students[i].birthday++;
        if ($rootScope.students[i].birthday > 365) {
          $rootScope.students[i].birthday=1;
          $rootScope.students[i].age++;
          if ($rootScope.students[i].age > 15) {
            $rootScope.adults.push({'name': $rootScope.students[i].name, 'age': $rootScope.students[i].age, 'gender':$rootScope.students[i].gender,
              'birthday':$rootScope.students[i].birthday, 'job':'none'});
            $rootScope.jobs.unemployed++;
            $rootScope.students.splice(i, 1);
          } 
        }
      }
      for (var i = 0; i < $rootScope.children.length; i++) {
        $rootScope.children[i].birthday++;
        if ($rootScope.children[i].birthday > 365) {
          $rootScope.children[i].birthday=1;
          $rootScope.children[i].age++;
          if ($rootScope.children[i].age > 10) {
            if ($rootscope.capacity.students < $rootscope.vars.studentsNum) {
              $rootScope.students.push({'name': $rootScope.children[i].name, 'age': $rootScope.children[i].age, 'gender':$rootScope.children[i].gender,
                'birthday':$rootScope.children[i].birthday, 'job':'none'});
              $rootScope.children.splice(i, 1);
            }
            else {
              $rootScope.adults.push({'name': $rootScope.children[i].name, 'age': $rootScope.children[i].age, 'gender':$rootScope.children[i].gender,
                'birthday':$rootScope.children[i].birthday, 'job':'none'});
              $rootScope.children.splice(i, 1);
              $rootScope.jobs.unemployed++;
            }
          } 
        }
      }
       
       
     
    }

    $scope.gather = function() {
        $rootScope.vars.food += $scope.calculateGather($rootScope.jobs.hunter, 400);
    }

    $scope.eat = function() {
        var foodNeed = Math.round(($rootScope.vars.population * 100)/52);
        //console.log(foodNeed);
        if (foodNeed <= $rootScope.vars.food) {
          $rootScope.vars.food -= foodNeed;
          $rootScope.conditions.starving = 0;
        }
        else if ($rootScope.conditions.starving > 0) {
          var starvingNew = Math.round(((foodNeed - $rootScope.vars.food)*52)/100);
          $rootScope.vars.food = 0;
          if (starvingNew > $rootScope.conditions.starving) {
            $scope.kill($rootScope.conditions.starving, ' died from starvation');
            $rootScope.conditions.starving = starvingNew - $rootScope.conditions.starving;
          }
          else {
            $scope.kill(starvingNew, ' died from starvation');
            if ($rootScope.vars.population > $rootScope.conditions.starving) $rootScope.conditions.starving = starvingNew;
            else $rootScope.conditions.starving = $rootScope.vars.population;
          }
        }
        else {
          $rootScope.conditions.starving = Math.round(((foodNeed - $rootScope.vars.food)*52)/100);
          //console.log($rootScope.conditions.starving);
          $rootScope.vars.food = 0;

        }
        //$rootScope.vars.food += $scope.calculateGather($rootScope.jobs.hunter, 400);

    }

    $scope.calculateGather = function(people, base1year) {
        return ($scope.timeStep/100)*$rootScope.multiplier*people*(base1year/35040); //35040 - 15 minute intervals in a year
        //return ($scope.timeStep/100)*$rootScope.multiplier*people*base15min;
        //goes off ~ 100 times (24*4)
    }

    $scope.gameLoopTick = function() {
      if ($scope.date.dayOfYear() != $scope.dayOld) { //new day
          $scope.dayOld=$scope.date.dayOfYear();
          $scope.ageOneDay();
          //temperature generation
          if (($rootScope.defaultTemp[$scope.monthOld].max>=0)&&($rootScope.defaultTemp[$scope.monthOld].min>=0)) {
            $rootScope.vars.todayWeather=$scope.random($rootScope.defaultTemp[$scope.monthOld].max, $rootScope.defaultTemp[$scope.monthOld].min);
          }
          else if (($rootScope.defaultTemp[$scope.monthOld].max<0)&&($rootScope.defaultTemp[$scope.monthOld].min<0)) {
            $rootScope.vars.todayWeather=$scope.random(Math.abs($rootScope.defaultTemp[$scope.monthOld].min), Math.abs($rootScope.defaultTemp[$scope.monthOld].max));
            $rootScope.vars.todayWeather *= -1;
          }
          else if (($rootScope.defaultTemp[$scope.monthOld].max>=0)&&($rootScope.defaultTemp[$scope.monthOld].min<0)) {
            $rootScope.vars.todayWeather=Math.floor(Math.random() * ($rootScope.defaultTemp[$scope.monthOld].max + Math.abs($rootScope.defaultTemp[$scope.monthOld].min))) - Math.abs($rootScope.defaultTemp[$scope.monthOld].min);
            if ($rootScope.vars.todayWeather >= 0) $rootScope.vars.todayWeather++;
          }
          

          if ($scope.date.month() != $scope.monthOld) {//new month
              $scope.monthOld=$scope.date.month();
             //console.log("month " + $scope.monthOld);
             //console.log("max:" + $rootScope.defaultTemp[$scope.monthOld].max);
             //console.log("min:" + $rootScope.defaultTemp[$scope.monthOld].min);
          }

          if ($scope.date.week() != $scope.weekOld) {//new week
              $scope.weekOld=$scope.date.week();
              $scope.eat();
              //console.log("week " + $scope.weekOld);
              $scope.saveAll();
          }
      }
      $scope.gather();
      //console.log($scope.date.hour());
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

    $scope.increaseWorkers = function(bool, str) {
        if (bool==true) {
          if ($rootScope.jobs.unemployed>0) {
            $rootScope.jobs.unemployed--;
            $rootScope.jobs[str]++;
          }
        }
        else {
          if ($rootScope.jobs[str]>0) {
            $rootScope.jobs[str]--;
            $rootScope.jobs.unemployed++;
          }
        }
    };

    
    //to deal with page changes
    $scope.$on("$destroy", function( event ) {
      $timeout.cancel($scope.timer);
    });



    $scope.doCollapse();
    $scope.optionsCollapsed = true;
    $scope.professionsCollapsed = false;
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

