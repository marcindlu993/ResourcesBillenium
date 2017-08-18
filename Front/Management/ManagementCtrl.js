'use strict';

var app = angular.module('myApp.ManagementView', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Timesheet', {
        templateUrl: 'Timesheet/TimesheetView.html',
        controller: 'ManagementCtrl'
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
    }),
        $routeProvider.when('/Management', {
            templateUrl: 'Management/ManagementView.html',
            controller: 'ManagementCtrl'
        });
}])

app.service("ManagementProvider", function ($http) { // zapyać czy jest sens w takich adresach
    var adressEmployees = "http://localhost:61148/Employee/";
    var adressProjects = "http://localhost:61148/Project/";
    var adressEmployeeProjects = "http://localhost:61148/EmployeeProject/";
    var getEmployees = adressEmployees + "all";
    var getProjects = adressProjects + "all";
    var getByEmployee = adressEmployeeProjects + "findByEmployee/";
    var getByProject = adressEmployeeProjects + "findByProject/";
    var addEmployeeProject = adressEmployeeProjects + "add"
    var deleteEmployeeProject = adressEmployeeProjects + "delete/"
    var getProjectEmployee = adressEmployeeProjects + "all";

    this.getDataEmployees = function () {
        return $http.get(getEmployees);
    }
    this.getDataProjects = function () {
        return $http.get(getProjects);
    }
    this.getEmployeeProjects = function (id) {
        return $http.get(getByEmployee + id);
    }
    this.addEmployeeProjectData = function (value) {//sprawdzić
        return $http.post(addEmployeeProject, value);
    }
    this.getDataProjectEmployees = function (id) {
        return $http.get(getByProject + id);
    }
    this.deleteDataProjectEmployees = function (id) {
        return $http.delete(deleteEmployeeProject + id);
    }
    this.getDataProjectsEmployees = function () {
        return $http.get(getProjectEmployee);
    }
});

app.controller('ManagementCtrl', ['$scope', 'ManagementProvider', '$filter', '$log', function ($scope, ManagementProvider, $log) {
    console.log("działa Management");

    getAll();
    function getAll() { // zapytać czy jest sens gdy w konrtolerze EmploeeCtrl są te same funkcje
        var serviceCallEmployees = ManagementProvider.getDataEmployees();
        var serviceCallProjects = ManagementProvider.getDataProjects();
        var serviceCallProjectsEmployees = ManagementProvider.getDataProjectsEmployees();
        serviceCallEmployees.then(function (d) {
            $scope.employees = d.data;
        }, function (error) {
            $log.error("błąd");
        }),
            serviceCallProjects.then(function (k) {
                $scope.projects = k.data;
            }, function (error) {
                $log.error("błąd");
            }),
            serviceCallProjectsEmployees.then(function (s) {
                var projectsEmployees = s.data;
                projectsEmployees.forEach(elem => {
                    var dateSince = moment(elem.SinceWhen);
                    var dateUntil = moment(elem.UntilWhen);
                    var dateNow = moment();
                    var dateOne = moment.duration(dateNow.diff(dateSince)).asDays();
                    var dateTwo = moment.duration(dateUntil.diff(dateSince)).asDays(); 
                    var progressDaysPercent = Math.floor(dateOne / dateTwo * 100);
                    if (progressDaysPercent > 100) {progressDaysPercent = 100;}
                    elem.progressDaysPercent = progressDaysPercent;
                    var progressDays = Math.floor(dateTwo - dateOne);
                    if (progressDays <=0 ) {progressDays = "End";}
                    else {progressDays = "To the end:" + progressDays + "days"};
                    elem.progressDays = progressDays;
                });
                $scope.projectsEmployees = projectsEmployees;
            }, function (error) {
                $log.error("błąd");
            })
    }

    $scope.infoEmployee = function (id) {
        console.log("działa info o pracowiku");
        var serviceCallEmployeeProjects = ManagementProvider.getEmployeeProjects(id);
        serviceCallEmployeeProjects.then(function (h) {
            $scope.employeeProjects = h.data;
            $scope.employeeId = id;
        }, function (error) {
            $log.error("błąd w pobieraniu");
        })
    }

    $scope.infoProject = function (id) {
        console.log("działa info o projekcie");
        var serviceCallProjectsData = ManagementProvider.getDataProjectEmployees(id);
        serviceCallProjectsData.then(function (w) {
            $scope.projectsInfo = w.data;
            $scope.projectId = id;
        }, function (error) {
            $log.error("błąd pobierania daych projektu");
        })
    }

    $scope.addToProject = function () {
        console.log("próba zapisu pracownika do projeku");
        if ($scope.SinceWhen) {
            var employeeProject = {
                "ProjectId": $scope.projectId,
                "EmployeeId": $scope.employeeId,
                "SinceWhen": $scope.SinceWhen + "T00:00:00",
                "UntilWhen": $scope.UntilWhen + "T00:00:00",
            }
            var serviceAddEmployeeProjects = ManagementProvider.addEmployeeProjectData(employeeProject);
            serviceAddEmployeeProjects.then(function () {
                console.log("dodawaie do bazy");
            }, function (error) {
                log.error("nie udało się");
            })
        }
    }

    $scope.deleteFromProject = function (id) {
        console.log("próba usunięcia pracownika z projektu");
        var serviceDelete = ManagementProvider.deleteDataProjectEmployees(id);
        serviceDelete.then(function () {
            console.log("usunięto z bazy");
        })
    }
}]);
