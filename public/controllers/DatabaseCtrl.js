'use strict';

angular.module('app.controllers')
  .controller('DatabaseCtrl', ['$rootScope', '$scope', 'Collections', '$stateParams', function($rootScope, $scope, Collections, $stateParams){
    
    $rootScope.database = $stateParams.database;
    $scope.collections = [];

    Collections.get({database: $rootScope.database}).$promise.then(function(collections){
      $scope.collections = collections.collections;
      $rootScope.collection = $scope.collections[0] ? $scope.collections[0].name : null;
      if ($rootScope.collection) {
        $rootScope.go('database.collection', {collection: $rootScope.collection});
      }
    });
      
  }]);