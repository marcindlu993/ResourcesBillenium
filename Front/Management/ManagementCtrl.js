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

app.controller('ManagementCtrl', ['$scope', function($scope){
    console.log("działa Management");
}])