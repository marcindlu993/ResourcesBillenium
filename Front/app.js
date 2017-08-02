'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.signInView',
  'myApp.EmployeeView',
  'myApp.ManagementView',
  'myApp.ProjectView',  
  'myApp.TimesheetView',
  'myApp.TimesheetPerProjectView',
  'myApp.UsersView',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/signInView'});
}]);


