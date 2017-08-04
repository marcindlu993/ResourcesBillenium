'use strict';

var app = angular.module('myApp.ManagementView', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/Management',{
        templateUrl: 'Management/ManagementView.html',
        controller: 'ManagementCtrl',
        // resolve: {
        //     auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
        //     var userInfo = authenticationSvc.getUserInfo();

        //         if (userInfo) {
        //             return $q.when(userInfo);
        //         } else {
        //             return $q.reject({ authenticated: false });
        //         }
        //     }]
        // }
    });
}])

app.service("MenagmentProvider", function ($http){
    var adressEmployees = "http://localhost:61148/Employee/";
    var adressProjects = "http://localhost:61148/Project/";
    var getEmployees = adressEmployees + "all";
    var getProjects = adressProjects + "all";

    this.getDataEmployees = function() {
        return $http.get(getEmployees);
    }
    this.getDataProjects = function() {
        return $http.get(getProjects);
    }
});

app.controller('ManagementCtrl', ['$scope', 'MenagmentProvider', '$filter', function($scope, MenagmentProvider){
    console.log("działa Management");

    getAll();
    function getAll() {
        var serviceCallEmployees = MenagmentProvider.getDataEmployees();
        var serviceCallProjecs = MenagmentProvider.getDataProjects();
        serviceCallEmployees.then(function (d) {
            $scope.employees = d.data;
        },function (error) {
            $log.error("błąd niewybaczalny");
        },
        serviceCallProjecs.then(function (k) {
            $scope.projects = k.data;
        },function (error) {
            $log.error("kolejny niewybaczalny błąd");
        }
    ))}
    function infoEmployee (employee) {
        console.log("działa info o pracowiku");
        $scope.infoAboutEmployee = employee;

    }
}])
