'use strict';

var app = angular.module('myApp.ProjectView', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/Project',{
        templateUrl: 'Project/ProjectView.html',
        controller: 'ProjectCtrl'
    });
}])

app.service("ProjectService", function($http){
  var address = "http://localhost:61148/Project/";
  var getFromUrl = address + "all";
  var postToUrl = address + "add";
  var deleteToUrl = address + "delete/";

  this.getData = function(){
    return $http.get(getFromUrl);
  }
  this.postData = function(value){
    return $http.post(postToUrl,value);
  }
  this.deleteData = function(id){
    return $http.delete(deleteToUrl + id);
  }
});

app.controller('ProjectCtrl', ['$scope', 'ProjectService', '$filter', function($scope, ProjectService) {
        $scope.zm = "ffsdfsdfs";
        console.log("działa Project");

       // Pobranie rekordów z bazy
        getAll();
        function getAll(){
          var serviceCall = ProjectService.getData();
          serviceCall.then(function (d){
            $scope.projects = d.data;
          }, function(error){
            $log.error("Ups coś poszło nie tak")
          })
        }
         
        $scope.metoda = function () {
          console.log("kliknięto przycisk");
        }

        //Dodawanie do bazy
        $scope.add = function(){ 
          console.log("próba dodania do bazy");
          if($scope.Name){
            var product = {
              "Name" : $scope.Name,
              "Comment" : $scope.Comment              
            }
            var serviceAdd = ProjectService.postData(product);
            serviceAdd.then(function(){
                getAll();
                console.log("dodawanie do bazy");
            },function(error){
              $log.error("nie udało się")
            })                   
          }
        }

        //zrobić update projektu
        // Usuwanie z bazy
        $scope.delete = function(id) {
          console.log("póba usunięcia");
          var serviceDelete = ProjectService.deleteData(id);
          serviceDelete.then(function () { 
            getAll();
            console.log("usunięcie z bazy");
          }, function (error) {
            $log.error("nie udało się");
          })
        }
}]);
