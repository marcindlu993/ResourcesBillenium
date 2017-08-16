'use strict'

var app = angular.module('myApp.TimesheetView', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/Timesheet', {
        templateUrl: 'Timesheet/TimesheetView.html',
        controller: 'ManagementCtrl'
    });
}])