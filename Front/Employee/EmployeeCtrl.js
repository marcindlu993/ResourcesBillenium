'use strict';

var app = angular.module('myApp.EmployeeView', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/Employee', {
    templateUrl: 'Employee/EmployeeView.html',
    controller: 'EmployeeCtrl'
  });
}])


app.service("EmployeeService", function ($http) {
  var address = "http://localhost:61148/Employee/";
  var getFromUrl = address + "all";
  var postToUrl = address + "add";
  var deleteToUrl = address + "delete/";

  this.getData = function () {
    return $http.get(getFromUrl);
  }
  this.postData = function (value) {
    return $http.post(postToUrl, value);
  }
  this.deleteData = function (id) {
    return $http.delete(deleteToUrl + id);
  }
});



app.controller('EmployeeCtrl', ['$scope', 'EmployeeService', '$filter', '$log', function ($scope, EmployeeService, $log) {
  $scope.zm = "ffsdfsdfs";
  console.log("działa Employee");

  // Pobranie rekordów z bazy
  getAll();
  function getAll() {
    var serviceCall = EmployeeService.getData();
    serviceCall.then(function (d) {
      $scope.employee = d.data;
    }, function (error) {
      $log.error("Ups coś poszło nie tak")
    })
  }

  $scope.metoda = function () {
    console.log("kliknięto przycisk");
  }

  //Dodawanie do bazy
  $scope.add = function () {
    console.log("próba dodania do bazy");
    if ($scope.Name) {
      var product = {
        "Name": $scope.Name,
        "Surname": $scope.Surname,
        "Platform": $scope.Platform,
        "Position": $scope.Position,
        "FTE": $scope.FTE,
      }
      var serviceAdd = EmployeeService.postData(product);
      serviceAdd.then(function () {
        getAll();
        console.log("dodawanie do bazy");
      }, function (error) {
        $log.error("nie udało się")
      })
    }
  }

  //zrobić update pracownika
  //  Usuwanie z bazy
  $scope.delete = function (id) { // zapytać czy ziana w WebApi jest ok
    console.log("próba usunięcia");
    var serviceDelete = EmployeeService.deleteData(id);
    serviceDelete.then(function () {
      getAll();
      console.log("usuniecie z bazy");
    }, function (error) {
      $log.error("nie udalo sie")
    })
  }
}]);
