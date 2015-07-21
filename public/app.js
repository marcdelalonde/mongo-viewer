angular.module('App', ['ngMaterial', 'app.services'])
  .controller('AppCtrl', ['$scope', '$mdSidenav', 'Databases', 'Collections', function($scope, $mdSidenav, Databases, Collections){
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.database = null;
    $scope.databases = [];
    $scope.collections = [];

    Databases.get().$promise.then(function(databases){
      $scope.databases = databases.databases;
    });

    $scope.$watch('database', function(database){
      if (database) {
        Collections.get({database: database}).$promise.then(function(collections){
          $scope.collections = collections.collections;
        });
      }
    });
   
  }]);

angular.module('app.services', ['ngResource'])
  .factory('Databases', ['$resource', function($resource){
    return $resource('/api/databases');
  }])
  .factory('Collections', ['$resource', function($resource){
    return $resource('/api/collections/:database', { database: '@database'});
  }]);