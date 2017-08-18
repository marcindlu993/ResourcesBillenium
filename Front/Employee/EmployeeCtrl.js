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
  var updateToUrl = address + "update";

  this.getData = function () {
    return $http.get(getFromUrl);
  }
  this.postData = function (value) {
    return $http.post(postToUrl, value);
  }
  this.deleteData = function (id) {
    return $http.delete(deleteToUrl + id);
  }
  this.putData = function (value) {
    return $http.put(updateToUrl, value);
  }
});



app.controller('EmployeeCtrl', ['$scope', 'EmployeeService', '$filter', '$log', function ($scope, EmployeeService, $log) {
  console.log("działa Employee");

  // Pobranie rekordów z bazy
  getAll();
  function getAll() {
    var serviceCall = EmployeeService.getData();
    serviceCall.then(function (d) {
      $scope.employees = d.data;
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

  //zrobić update pracownika, nie działa
    $scope.update = function () {
    console.log("próba update do bazy");
    if ($scope.Name) {
      var product = {
        "Name": $scope.Name,
        "Surname": $scope.Surname,
        "Platform": $scope.Platform,
        "Position": $scope.Position,
        "FTE": $scope.FTE,
      }
      var servicePut = EmployeeService.putData(product);
      servicePut.then(function () {
        getAll();
        console.log("dodawanie do bazy");
      }, function (error) {
        $log.error("nie udało się")
      })
    }
  }
  //  Usuwanie z bazy
  $scope.delete = function (id) {
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
