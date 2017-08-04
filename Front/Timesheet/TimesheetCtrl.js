'use strict'

var app = angular.module('myApp.TimesheetView', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/Timesheet', {
        templateUrl: 'Timesheet/TimesheetView.html',
        controller: 'TimesheetCtrl'
    });
}])

// app.service("ProjectService", function ($http) {
//     var address = "http://localhost:61148/Stylesheet/";
//     var getFromUrl = address + "all";
//     var postToUrl = address + "add";
//     var deleteToUrl = address + "delete/";

//     this.getData = function () {
//         return $http.get(getFromUrl);
//     }
//     this.postData = function (value) {
//         return $http.post(postToUrl, value);
//     }
//     this.deleteData = function (id) {
//         return $http.delete(deleteToUrl + id);
//     }
// });

app.controller('TimesheetCtrl', ['$scope', 'ProjectService', '$filter', function($scope, ProjectService) {
    $scope.zm = "PozdrawiamMameiTate";
    console.log("działa Timesheet");

//     //Pobranie rekordów z bazy
//     getAll();
//     function getAll() {
//         var serviceCall = EmployeeService.etData();
//         serviceCall.then(function (d) {
//             $scope.project = d.data;
//         }, function (error) {
//             $log.error("Coś nie działa")
//         })
//     }
}])