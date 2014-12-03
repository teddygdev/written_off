'use strict';

angular.module('writtenOffApp.gameScreen', ['ngRoute', 'ui.bootstrap'])



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
        $scope.load("babies");
        $scope.load("queue");
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
      $scope.save($rootScope.babies, "babies");
      $scope.save($rootScope.queue, "queue");
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

    $scope.resetJobs = function() {
        for (var i in $rootScope.jobs) {
               $rootScope.jobs[i] = 0;
        }
        $rootScope.jobs.unemployed = $rootScope.vars.adultsNum;
    }

    $scope.kill = function(num, death, type, index) {
      //console.log("killing:" + num);
      if (num>$rootScope.vars.population) num = $rootScope.vars.population;
      //console.log("killing adjusted:" + num);
      if (type == undefined) var specified=false;
      try {
        for(var i=0; i < num; i++) {
          //console.log("loop" + i);
          //console.log(type);
          if (specified==false) var type = $scope.random(4,1);
          //console.log("decided type" + type);
          if ((type == 1)&&($rootScope.vars.adultsNum<1)) type=2;
          if ((type == 2)&&($rootScope.vars.studentsNum<1)) type=3;
          if ((type == 3)&&($rootScope.vars.childrenNum<1)) type=1;
          if ((type == 1)&&($rootScope.vars.adultsNum<1)) type=2;
          //console.log("adjusted type" + type);

          if ($rootScope.vars.population>0) {
            $rootScope.vars.population--;
            if (type == 1) {
              if ($rootScope.vars.adultsNum>0) {
                $rootScope.vars.adultsNum--;
                var toDie = $scope.random($rootScope.adults.length, 0);
                if (index != undefined) toDie=index;
               

                var cnt=0;
                for (var j in $rootScope.jobs) {
                  if ($rootScope.jobs[j] > 0) {
                    cnt++;
                  }
                }
                
                var stop = $scope.random(cnt, 0);
                var cnt2 = 0;
                for (var j in $rootScope.jobs) {
                  if ($rootScope.jobs[j] > 0) {
                    if (cnt2==stop) {
                      $rootScope.jobs[j]--;
                      console.log($rootScope.adults[toDie].name + ' the ' + j + death + ' at age ' + $rootScope.adults[toDie].age);
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
                if (death==' died from old age') death = ' died from a disease';
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
                var toDie = $scope.random($rootScope.children.length, 0);
                if (death==' died from old age') death = ' died from a disease';
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
      catch(err) {
        console.log("Something went wrong with a person dying... Yay?  Error: " + err);
      }
    }

    $scope.ageOneDay = function() {
      //console.log($rootScope.adults[0].birthday);
      var todayRandom=$scope.random(20000, 1);
      for (var i = 0; i < $rootScope.adults.length; i++) {
        $rootScope.adults[i].birthday += $rootScope.vars.day;
        if ($rootScope.adults[i].birthday > 365) {
          $rootScope.adults[i].birthday=1;
          $rootScope.adults[i].age++;
          if ($rootScope.adults[i].age>50) {
            if (todayRandom<750) $scope.kill(1, ' died from old age', 1, i);
          }
        }
        else if (todayRandom==1000) {
            $scope.kill(1, ' died from random event', 1, i); //put in array of random events
            todayRandom=10000;
        }
      }
      for (var i = 0; i < $rootScope.students.length; i++) {
        $rootScope.students[i].birthday += $rootScope.vars.day;
        if ($rootScope.students[i].birthday > 365) {
          $rootScope.students[i].birthday=1;
          $rootScope.students[i].age++;
          if ($rootScope.students[i].age > 15) {
            $rootScope.adults.push({'name': $rootScope.students[i].name, 'age': $rootScope.students[i].age, 'gender':$rootScope.students[i].gender,
              'birthday':$rootScope.students[i].birthday, 'education':true});
            $rootScope.jobs.unemployed++;
            $rootScope.vars.studentsNum--;
            $rootScope.vars.adultsNum++;
            $rootScope.students.splice(i, 1);
          }
          else if (todayRandom==2000) {
            $scope.kill(1, ' died from random event', 2, i); //put in array of random events
            todayRandom=10000;
          } 
        }
      }
      for (var i = 0; i < $rootScope.children.length; i++) {
        $rootScope.children[i].birthday += $rootScope.vars.day;
        if ($rootScope.children[i].birthday > 365) {
          $rootScope.children[i].birthday=1;
          $rootScope.children[i].age++;
          if ($rootScope.children[i].age > 10) {
            if ($rootScope.capacity.students > $rootScope.vars.studentsNum) {
              $rootScope.students.push({'name': $rootScope.children[i].name, 'age': $rootScope.children[i].age, 'gender':$rootScope.children[i].gender,
                'birthday':$rootScope.children[i].birthday, 'education':false});
              $rootScope.children.splice(i, 1);
              $rootScope.vars.studentsNum++;
              $rootScope.vars.childrenNum--;
            }
            else {
              $rootScope.adults.push({'name': $rootScope.children[i].name, 'age': $rootScope.children[i].age, 'gender':$rootScope.children[i].gender,
                'birthday':$rootScope.children[i].birthday, 'education':false});
              $rootScope.children.splice(i, 1);
              $rootScope.jobs.unemployed++;
              $rootScope.vars.childrenNum--;
              $rootScope.vars.adultsNum++;
            }
          } 
        }
        else if (todayRandom==3000) {
            $scope.kill(1, ' died from random event', 3, i); //put in array of random events
            todayRandom=10000;
        }
      }
      for (var i = 0; i < $rootScope.babies.length; i++) {
        $rootScope.babies[i].birthday += $rootScope.vars.day;
        if ($rootScope.babies[i].birthday >= 0) {
          var birthday=$scope.date.dayOfYear();
          var binGender=Math.floor((Math.random() * 2) + 1);
          if (binGender==1) var gender = 'male';
          else var gender = 'female';
          $rootScope.children.push({'name':faker.name.firstName(), 'age':0, 'gender':gender, 'birthday':birthday});
          $rootScope.babies.splice(i, 1);
          $rootScope.vars.population++;
          $rootScope.vars.childrenNum++;
           
        }
      }
       
       
     
    }

    $scope.gather = function() {
        $rootScope.vars.food += $scope.calculateGather($rootScope.jobs.hunter, 400);
        $rootScope.vars.logs += $scope.calculateGather($rootScope.jobs.forester, 400);
        $rootScope.vars.stone += $scope.calculateGather($rootScope.jobs.stonecutter, 400);
        $scope.calculateProduction($rootScope.jobs.woodcutter, 'firewood', 400, 'logs', 100);
    }

    $scope.calculateGather = function(people, base1year) {
        return ($scope.timeStep/100)*$rootScope.multiplier*people*(base1year/35040) * (($rootScope.vars.productivityEdu)/100) * (($rootScope.vars.productivityTools)/100) * (($rootScope.vars.productivityCoats)/100);
        //35040 - 15 minute intervals in a year
        //return ($scope.timeStep/100)*$rootScope.multiplier*people*base15min;
        //goes off ~ 100 times (24*4)
    }

    $scope.calculateProduction = function(people, base, base1year, mat, mat1year) { //when producing only reduce/increase output for productivity modifiers
        var needed1 = ($scope.timeStep/100)*$rootScope.multiplier*1*(mat1year/35040); //35040 - 15 minute intervals in a year
        var max = 0;
        //console.log($rootScope.vars[mat]);
        for (var i=1; i<=people+1; i++) {
          if (needed1*i > $rootScope.vars[mat]) {
            max = i-1;
            //console.log(max);
            break;
          }
          else max = people;
        }
        var created = ($scope.timeStep/100)*$rootScope.multiplier*max*(base1year/35040) * ($rootScope.vars.productivityEdu)/100 * ($rootScope.vars.productivityTools)/100 * ($rootScope.vars.productivityCoats)/100;
        $rootScope.vars[mat] -= needed1 * max;
        $rootScope.vars[base] += created;
        //return ($scope.timeStep/100)*$rootScope.multiplier*people*base15min;
        //goes off ~ 100 times (24*4)
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

    $scope.houseHeating = function() {
      //$rootScope.buildings.house=10;
      //$rootScope.vars.haveRoof = $rootScope.vars.population;
      if (($scope.date.month() < 9)&&($scope.date.year()==1)) {
        if (($scope.date.month() < 9)&&($scope.date.year()==1)) {
          //console.log("gratis");
        }
        else {
          if ($rootScope.vars.todayWeather >= 0) console.log("You should build some houses before your villagers freeze to death");
          else $scope.kill($rootScope.vars.population - $rootScope.vars.haveRoof, ' died from freezing outside'); 
        }


      }
      else {
        if ($rootScope.vars.population - $rootScope.vars.haveRoof>0) {
          //console.log('pop:'+$rootScope.vars.population);
          //console.log('roof'+$rootScope.vars.haveRoof);
        }
        if ($rootScope.vars.todayWeather >= 0) console.log("You should build some houses before your villagers freeze to death");
        else $scope.kill($rootScope.vars.population - $rootScope.vars.haveRoof, ' died from freezing outside'); 
        var woodNeed = Math.round(($rootScope.vars.haveRoof / $rootScope.buildings.house.cap) * $rootScope.capacity.heatEf);
          //console.log(foodNeed);
          if (woodNeed <= $rootScope.vars.firewood) {
            $rootScope.vars.firewood -= woodNeed;
            $rootScope.conditions.freezing = 0;
          }
          else if ($rootScope.conditions.freezing > 0) {
            var freezingNew = Math.round((woodNeed - $rootScope.vars.firewood)/($rootScope.capacity.heatEf));
            $rootScope.vars.firewood = 0;
            if (freezingNew > $rootScope.conditions.freezing) {
              //console.log($rootScope.conditions.freezing);
              //console.log("going to kill:" + $rootScope.conditions.freezing * $rootScope.capacity.house);
              $scope.kill($rootScope.conditions.freezing * $rootScope.buildings.house.cap, ' died from frostbite');
              $rootScope.conditions.freezing = freezingNew - $rootScope.conditions.freezing;
            }
            else {
              //console.log("going to kill:" +freezingNew);
              $scope.kill(freezingNew * $rootScope.buildings.house.cap, ' died from frostbite');
              if ($rootScope.vars.population > $rootScope.conditions.freezing) $rootScope.conditions.freezing = freezingNew;
              else $rootScope.conditions.freezing = $rootScope.vars.population;
            }
          }
          else {
            $rootScope.conditions.freezing = Math.round((woodNeed - $rootScope.vars.firewood)/($rootScope.capacity.heatEf));
            //console.log($rootScope.conditions.freezing);
            $rootScope.vars.firewood = 0;

          }
        }
    }

    

    $scope.gameLoopTick = function() {
      if ($scope.date.dayOfYear() != $scope.dayOld) { //new day
          $scope.dayOld=$scope.date.dayOfYear();
          $scope.ageOneDay();
          $scope.calcHomeless();
          $scope.calcStudent();
          $scope.calcProductivity();
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
              $scope.makeBaby();
             //console.log("month " + $scope.monthOld);
             //console.log("max:" + $rootScope.defaultTemp[$scope.monthOld].max);
             //console.log("min:" + $rootScope.defaultTemp[$scope.monthOld].min);
          }

          if ($scope.date.week() != $scope.weekOld) {//new week
              $scope.weekOld=$scope.date.week();
              $scope.eat();
              if ($rootScope.vars.todayWeather < 10) $scope.houseHeating();
              //console.log("week " + $scope.weekOld);
              $scope.saveAll();
          }
      }
      //$scope.calcHomeless();
      $scope.gather();
      $scope.maxBarCalc();
      $scope.buildProcess();
      
      

      //console.log($scope.date.hour());
      $scope.date.add((($scope.timeStep/100)*15*$rootScope.multiplier), 'm');
      $scope.datePretty = $scope.date.format('[Year] YYYY MMM Do');
    };

    $scope.calcHomeless = function() {
      $rootScope.vars.haveRoof = $rootScope.buildings.house.have * $rootScope.buildings.house.cap;
      var maxHousing = $rootScope.buildings.house.have * $rootScope.buildings.house.cap;
      if ($rootScope.vars.population - $rootScope.vars.haveRoof>0) {
          //console.log('popcalc:'+$rootScope.vars.population);
          //console.log('roofcalc'+$rootScope.vars.haveRoof);
        }
      if (maxHousing>=$rootScope.vars.population) $rootScope.vars.haveRoof = $rootScope.vars.population;
      else $rootScope.vars.haveRoof = maxHousing;
    }

    $scope.calcStudent = function() {
      if ($rootScope.jobs.teacher>=$rootScope.buildings.school.have) var count = $rootScope.buildings.school.have;
      else var count = $rootScope.jobs.teacher;
      $rootScope.capacity.students = count * $rootScope.buildings.school.cap;
      //console.log("student cap:" + $rootScope.capacity.students);
      //console.log("student num:" + $rootScope.vars.studentsNum);
      if ($rootScope.capacity.students<$rootScope.vars.studentsNum) {
            var i = $rootScope.vars.studentsNum-1;
            $rootScope.adults.push({'name': $rootScope.students[i].name, 'age': $rootScope.students[i].age, 'gender':$rootScope.students[i].gender,
              'birthday':$rootScope.students[i].birthday, 'education':false});
            $rootScope.jobs.unemployed++;
            $rootScope.vars.studentsNum--;
            $rootScope.vars.adultsNum++;
            $rootScope.students.splice(i, 1);
            console.log("dropped a student");
      }
    }

    $scope.calcProductivity = function() {
      var count = 0;

      for (var i in $rootScope.adults) {
        //console.log($rootScope.adults[i]['education']);
        if($rootScope.adults[i]['education']==true) {
          count++;
        }
      }
      $rootScope.vars.education=count;
      $rootScope.vars.productivityEdu=($rootScope.vars.education/$rootScope.vars.adultsNum) * 100;
      $rootScope.vars.productivityEdu = Math.round($rootScope.vars.productivityEdu + ($rootScope.vars.productivityEdu/4));
	  console.log("edu" + $rootScope.vars.productivityEdu);
      //$rootScope.vars.productivityTools=($rootScope.vars.tools/$rootScope.vars.adultsNum) * 100;
	  if ($rootScope.vars.tools<$rootScope.vars.adultsNum) {
		$rootScope.vars.productivityTools=($rootScope.vars.tools/$rootScope.vars.adultsNum) * 100;
		$rootScope.vars.productivityTools = Math.round($rootScope.vars.productivityTools + ($rootScope.vars.productivityTools/6));
	  }
	  else $rootScope.vars.productivityTools = 100;
	  console.log("tools" + $rootScope.vars.productivityTools);
      
      $rootScope.vars.productivityCoats=($rootScope.vars.coats/$rootScope.vars.adultsNum) * 100;
      if ($rootScope.vars.todayWeather >= 20) $rootScope.vars.productivityCoats=125;
      else if ($rootScope.vars.todayWeather < 20) $rootScope.vars.productivityCoats = Math.round($rootScope.vars.productivityCoats + ($rootScope.vars.productivityCoats/2));
      else if ($rootScope.vars.todayWeather < 15) $rootScope.vars.productivityCoats = Math.round($rootScope.vars.productivityCoats + ($rootScope.vars.productivityCoats/3));
      else if ($rootScope.vars.todayWeather < 10) $rootScope.vars.productivityCoats = Math.round($rootScope.vars.productivityCoats + ($rootScope.vars.productivityCoats/4));
      else if ($rootScope.vars.todayWeather < 5) $rootScope.vars.productivityCoats = Math.round($rootScope.vars.productivityCoats + ($rootScope.vars.productivityCoats/7));
      else $rootScope.vars.productivityCoats = Math.round($rootScope.vars.productivityCoats + ($rootScope.vars.productivityCoats/10));
      console.log("coats" + $rootScope.vars.productivityCoats);
    }

    $scope.maxBarCalc = function() {
      for (var i in $rootScope.buildings) {
        var name = i;
        $scope.maxBar[i]=$rootScope.buildings[name]['logs']+$rootScope.buildings[name]['stone']+$rootScope.buildings[name]['iron'];
        //console.log($scope.maxBar[i] + i);
        var logs = $rootScope.vars.logs;
        if (logs > $rootScope.buildings[name]['logs']) logs = $rootScope.buildings[name]['logs'];
        var stone = $rootScope.vars.stone;
        if (stone > $rootScope.buildings[name]['stone']) stone = $rootScope.buildings[name]['stone'];
        var iron = $rootScope.vars.iron; 
        if (iron > $rootScope.buildings[name]['iron']) iron = $rootScope.buildings[name]['iron'];
        $scope.valBar[i]=(logs + stone + iron);
      }
    }

    $scope.makeBaby = function() {
      var men = 0;
      var women = 0;
      for (var i=0; i<$rootScope.adults.length; i++) {
        if (($rootScope.adults[i].gender=='female')&&($rootScope.adults[i].age<40)) women++;
        else if ($rootScope.adults[i].gender=='male') men+=1;
      }
      if (men>=women) var posBabies = women;
      else var posBabies = men;
      var capacity = ($rootScope.buildings.house.have * $rootScope.buildings.house.cap) - $rootScope.vars.haveRoof;
      //console.log(capacity);
      if (capacity>=posBabies) var makeBabies=posBabies;
      else var makeBabies=capacity;
      if ($rootScope.babies.length >= posBabies) {
        makeBabies=0;
      }
      
      
      //if (capacity<1) {
      if ($rootScope.babies.length>capacity) {
        for (var i=0; i<$rootScope.babies.length-capacity; i++)
          $rootScope.babies.pop();
      }
      else {
        for (var i=0; i<makeBabies; i++) {
          var birthdayDay=$scope.random(300,240);
          birthdayDay = birthdayDay * (-1);
          $rootScope.babies.push({'birthday':birthdayDay});
        }
      }
      //console.log('length' + $rootScope.babies.length);
    }

    $scope.build = function(name, pretty) {
      //$scope.maxBar=$rootScope.buildings[name]['logs']+$rootScope.buildings[name]['stone']+$rootScope.buildings[name]['iron'];
      //var logs = $rootScope.vars.logs;
      //if (logs > $rootScope.buildings[name]['logs']) logs = $rootScope.buildings[name]['logs'];
      //var stone = $rootScope.vars.stone;
      //if (stone > $rootScope.buildings[name]['stone']) stone = $rootScope.buildings[name]['stone'];
      //var iron = $rootScope.vars.iron; 
      //if (iron > $rootScope.buildings[name]['iron']) iron = $rootScope.buildings[name]['iron'];
      //$scope.valBar= logs + stone + iron;
      $rootScope.vars.logs -= $rootScope.buildings[name]['logs'];
      $rootScope.vars.stone -= $rootScope.buildings[name]['stone'];
      $rootScope.vars.iron -= $rootScope.buildings[name]['iron'];
      //$rootScope.buildings[bname]['have']++;
      $rootScope.queue.push({"name":pretty, "pass":name});
    }

    $scope.buildProcess = function() {
      var power = $scope.calculateGather($rootScope.jobs.builder, 365);
      if ($rootScope.queue.length>0) {
        var name = $rootScope.queue[0]['pass'];
        //console.log(name);
        $scope.buildBarMax = ($rootScope.buildings[name]['logs'] + $rootScope.buildings[name]['stone'] + $rootScope.buildings[name]['iron']) * 2;
        $scope.buildBarVal += power;
        if ($scope.buildBarVal>=$scope.buildBarMax) {
          $scope.buildBarMax=100;
          $scope.buildBarVal=0;
          $rootScope.buildings[name]['have']++;
          $rootScope.queue.shift();
        }
      }
      else {
        $scope.buildBarMax=100;
        $scope.buildBarVal=0;
      }
    }

    
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
    $scope.buildingsCollapsed = false;
    $scope.professionsCollapsed = true;
    $scope.fps=10;

   
    $scope.buildBarMax=100;
    $scope.buildBarVal=0;

    




    
    //console.log($rootScope.adults);
    //console.log($rootScope.children);
    //console.log($rootScope.jobs.unemployed);

    $scope.hideBadFoodVal = true;
    $scope.hideGoodFoodVal = true;
    $scope.foodAttempts = 0;
    $scope.loadAll();
    $scope.saveAll();
    $scope.maxBar={};
    $scope.valBar={};
    $scope.dayOld=$scope.date.dayOfYear();
    $scope.monthOld=$scope.date.month();
    $scope.weekOld=$scope.date.week();

    
    for (var i in $rootScope.buildings) {
      //console.log(i);
      $scope.maxBar[i]=1000;
      $scope.valBar[i]=0;
    }

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

    document.ondblclick = function(evt) {
    if (window.getSelection)
        window.getSelection().removeAllRanges();
    else if (document.selection)
        document.selection.empty();
    }
    

}]);

