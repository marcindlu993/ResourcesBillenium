'use strict'

var app = angular.module('myApp.TimesheetView', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/Timesheet', {
        templateUrl: 'Timesheet/TimesheetView.html',
        controller: 'TimesheetCtrl'
    });
}])

app.controller('TimesheetCtrl', ['$scope', function($scope){
    console.log("działa Timesheet");
}])