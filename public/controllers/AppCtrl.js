'use strict';

angular.module('app.controllers', []);

angular.module('app.controllers')
  .controller('AppCtrl', ['$rootScope', '$scope', '$mdSidenav', '$state', 'Databases', function($rootScope, $scope, $mdSidenav, $state, Databases){
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $rootScope.server = 'localhost';
    $rootScope.database = null;
    $rootScope.collection = null;
    $scope.databases = [];

    Databases.get().$promise.then(function(databases){
      $scope.databases = databases.databases;
    });

    $rootScope.go = function(state, params) {
      $state.go(state, params);
    };
   
  }]);