'use strict';

var app = angular.module('myApp.ManagementView', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Management', {
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

app.service("MenagmentProvider", function ($http) { // zapyać czy jest sens w takich adresach
    var adressEmployees = "http://localhost:61148/Employee/";
    var adressProjects = "http://localhost:61148/Project/";
    var adressEmployeeProjects = "http://localhost:61148/EmployeeProject/";
    var getEmployees = adressEmployees + "all";
    var getProjects = adressProjects + "all";
    var getByEmployee = adressEmployeeProjects + "findByEmployee/";
    var getByProject = adressEmployeeProjects + "findByProject/";
    var addEmployeeProject = adressEmployeeProjects + "add"

    this.getDataEmployees = function () {
        return $http.get(getEmployees);
    }
    this.getDataProjects = function () {
        return $http.get(getProjects);
    }
    this.getEmployeeProjects = function (id) {
        return $http.get(getByEmployee + id);
    }
    this.addEmployeeProjectData = function (id) {//sprawdzić
        return $http.get(addEmployeeProject);
    }
    this.getDataProjectEmployees = function (id) {
        return $http.get(getByProject + id);
    }
});

app.controller('ManagementCtrl', ['$scope', 'MenagmentProvider', '$filter','$log', function ($scope, MenagmentProvider) {
    console.log("działa Management");

    getAll();
    function getAll() { // zapytać czy jest sens gdy w konrtolerze EmploeeCtrl są te same funkcje
        var serviceCallEmployees = MenagmentProvider.getDataEmployees();
        var serviceCallProjects = MenagmentProvider.getDataProjects();
        serviceCallEmployees.then(function (d) {
            $scope.employees = d.data;
        }, function (error) {
            $log.error("błąd niewybaczalny");
        },
            serviceCallProjects.then(function (k) {
                $scope.projects = k.data;
            }, function (error) {
                $log.error("kolejny niewybaczalny błąd");
            }
            ))
    }

    $scope.infoEmployee = function (id) {
        console.log("działa info o pracowiku");
        var serviceCallEmployeeProjects = MenagmentProvider.getEmployeeProjects(id);
        serviceCallEmployeeProjects.then(function (h) {
            $scope.employeeProjects = h.data;
            $scope.employeeId = id;
        }, function (error) {
            $log.error("błąd w pobieraniu");
        })
    }

    $scope.infoProject = function (id) {
        console.log("działa info o projekcie");
        var serviceCallProjectsData = MenagmentProvider.getDataProjectEmployees(id);
        serviceCallProjectsData.then(function (w) {
            $scope.projectsInfo = w.data;
        }, function (error) {
            $log.error("błąd pobierania daych projektu");
        })
    }

    $scope.addToProject = function () {
        console.log("próba zapisu pracownika do projeku");
        if ($scope.Since) {
            var employeeProject = {
                "ProjectId" : $scope.projectForEmployee.IdProject,
                "EmployeeId" : $scope.projectForEmployee.IdEmployee,
                "SinceWhen" : $scope.SinceWhen,
                "UntilWen" : $scope.UntilWhen,
            }
            var serviceAddEmployeeProjects = MenagmentProvider.addEmployeeProject(employeeProject);
            serviceAddEmployeeProjects.then(function (){
                console.log("dodawaie do bazy");
            },function (error) {
                log.error("nie udało się");
            })
        }
    }
}])
