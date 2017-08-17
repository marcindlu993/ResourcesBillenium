'use strict'

var app = angular.module('myApp.TimesheetView', ['ngRoute','myApp.ManagementView']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/Timesheet', {
        templateUrl: 'Timesheet/TimesheetView.html',
        controller: 'ManagementCtrl'
    });
}])