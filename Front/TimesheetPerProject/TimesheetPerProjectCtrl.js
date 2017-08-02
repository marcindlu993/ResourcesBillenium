'use strict';

var app = angular.module('myApp.TimesheetPerProjectView', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/TimesheetPerProject', {
    templateUrl: 'TimesheetPerProject/TimesheetPerProjectView.html',
    controller: 'TimesheetPerProjectCtrl'
  });
}])

app.controller('TimesheetPerProjectCtrl', ['$scope', function($scope) {
      console.log("działa TimesheetPerProject");
}]);