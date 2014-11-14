'use strict';

/**
  * @ngdoc service
  * @name swarmApp.schedule
  * @description
  * # schedule
  * Service in the swarmApp.
 */
angular.module('writtenOffApp').service('schedule', function($timeout, $interval, $rootScope) {
  var Schedule;
  var milis=1000;
  return new (Schedule = (function() {
    function Schedule() {
      this.unpause();
    }

    Schedule.prototype.unpause = function() {
      return this.ticker = $interval(((function(_this) {
        return function() {
          return _this.tick();
        };
      })(this)), milis);
    };

    Schedule.prototype.pause = function() {
      return $interval.cancel(this.ticker);
    };

    Schedule.prototype.tick = function() {
      //console.log('tick');
      //$rootScope.$broadcast('tick');
      //return session.food += session.drone;
      //$scope.food=$scope.food +1;
    };

    return Schedule;

  })());

 



});

angular.module('writtenOffApp').run(function(schedule) {});