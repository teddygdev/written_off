'use strict';

angular.module('writtenOffApp.view2', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'partials/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('ModalDemoCtrl', function($scope, $modal) {
  

})

.controller('View2Ctrl', [function() {



}]);