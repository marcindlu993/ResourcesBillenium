'use strict';

var app = angular.module('myApp.signInView', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signInView', {
    templateUrl: 'signIn/signInView.html',
    controller: 'signInCtrl'
  });
}])

app.controller('signInCtrl', ['$scope', function($scope) {
      $scope.zmienna = "zmienna z kontrolera signIn";
      console.log("działa signIn");
}]);



// 'use strict';

// var app = angular.module('myApp.signInView', ['ngRoute']);

// app.config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/signInView', {
//     templateUrl: 'signIn/signInView.html',
//     controller: 'signInCtrl'    
//   });
// }])



// app.controller('signInCtrl', ['$scope', function($scope) {
//       $scope.zmienna = "zmienna z kontrolera signIn";
//       console.log("działa signIn");
// }]);


// app.factory("authenticationSvc", function($http, $q, $window) {
//   var userInfo;

//   function login(userName, password) {
//     var deferred = $q.defer();

//     $http.post("http://10.24.14.213:61148/token", {
//       userName: userName,
//       password: password,
//       grant_type: password
//     }).then(function(result) {
//       userInfo = {
//         accessToken: result.data.access_token,
//         userName: result.data.userName,
//         grant_type: password
//       };
//       $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
//       deferred.resolve(userInfo);
//     }, function(error) {
//       deferred.reject(error);
//     });

//     return deferred.promise;
//   }

//   return {
//     login: login
//   };
// });


// app.factory("authenticationSvc", function() {
//   var userInfo;

//   function getUserInfo() {
//     return userInfo;
//   }
// });


// app.run(["$rootScope", "$location", function($rootScope, $location) {
//   $rootScope.$on("$routeChangeSuccess", function(userInfo) {
//     console.log(userInfo);
//   });

//   $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
//     if (eventObj.authenticated === false) {
//       $location.path("/login");
//     }
//   });
// }]);

// function init() {
//   if ($window.sessionStorage["userInfo"]) {
//     userInfo = JSON.parse($window.sessionStorage["userInfo"]);
//   }
// }

// init();

// function logout() {
//   var deferred = $q.defer();

//   $http({
//     method: "POST",
//     url: logoutUrl,
//     headers: {
//       "access_token": userInfo.accessToken
//     }
//   }).then(function(result) {
//     $window.sessionStorage["userInfo"] = null;
//     userInfo = null;
//     deferred.resolve(result);
//   }, function(error) {
//     deferred.reject(error);
//   });

//   return deferred.promise;
// }