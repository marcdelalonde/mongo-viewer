angular.module('App', ['ui.router', 'ngMaterial', 'app.services'])
  .config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to homepage
    $urlRouterProvider.otherwise('/');

    // Homepage
    $stateProvider.state('homepage', {
      url: '/'
    });

    $stateProvider.state('database', {
      url: '/:database',
      templateUrl: 'views/database.html',
      controller: 'DatabaseCtrl'
    });

    $stateProvider.state('database.collection', {
      url: '/:collection',
      parent: 'database',
      templateUrl: 'views/collection.html',
      controller: 'CollectionCtrl'
    });

  })
  .controller('AppCtrl', ['$scope', '$mdSidenav', '$state', 'Databases', 'Collections', function($scope, $mdSidenav, $state, Databases, Collections){
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.server = 'localhost';
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

    $scope.go = function(state, params) {
      $state.go(state, params);
    };
   
  }])
  .controller('DatabaseCtrl', ['$scope', 'Databases', 'Collections', function($scope, Databases, Collections){
    
    console.log('DatabaseCtrl');
   
  }]);

angular.module('app.services', ['ngResource'])
  .factory('Databases', ['$resource', function($resource){
    return $resource('/api/databases');
  }])
  .factory('Collections', ['$resource', function($resource){
    return $resource('/api/collections/:database', { database: '@database'});
  }]);