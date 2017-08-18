'use strict';

var app = angular.module('myApp.UsersView', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Users', {
    templateUrl: 'Users/UsersView.html',
    controller: 'UsersCtrl'
  });
}])

app.service("UsersService", function($http){
  var address = "http://10.24.14.213:61148/accounts/";
  var getFromUrl = address + "users";
  var postToUrl = address + "create";
  //var deleteToUrl = address + "delete/"+id;

  this.getData = function(){
    return $http.get(getFromUrl);
  }
  this.postData = function(value){
    return $http.post(postToUrl,value);
  }
  // this.delete = function(id){
  //   return $http.delete(deleteToUrl,id);
  // }
});

app.controller('UsersCtrl', ['$scope', 'UsersService', '$filter', function($scope, UsersService) {
        $scope.zm = "ffsdfsdfs";
        console.log("działa Users");

       // Pobranie rekordów z bazy
        getAll();
        function getAll(){
          var serviceCall = UsersService.getData();
            serviceCall.then(function(d) {
                    $scope.users = d.data;
                },
                function(error) {
                    $log.error("Ups coś poszło nie tak");
                });
        }
         
        $scope.metoda = function () {
          console.log("kliknięto przycisk");
        }

        //Dodawanie do bazy
        $scope.add = function(){ 
          console.log("próba dodania do bazy");
          if($scope.Name){
            var product = {
              "UserName" : $scope.UserName,
              "Name" : $scope.Name,
              "Surname" : $scope.Surname,
              "Email" : $scope.Email,
              "Password" : $scope.Password,
              "ConfirmPassword": $scope.ConfirmPassword
            }
            var serviceAdd = UsersService.postData(product);
            serviceAdd.then(function(){
                console.log("dodawanie do bazy");
            },function(error){
              $log.error("nie udało się")
            })                   
          }
        }

        // Usuwanie z bazy
        // $scope.del = function(){
        //     console.log("próba usunięcia");
            
        // }
}]);
