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
  .filter('json', function() {
    return function(json) {
        function syntaxHighlight(json) {
          json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
              var cls = 'number';
              if (/^"/.test(match)) {
                  if (/:$/.test(match)) {
                      cls = 'key';
                  } else {
                      cls = 'string';
                  }
              } else if (/true|false/.test(match)) {
                  cls = 'boolean';
              } else if (/null/.test(match)) {
                  cls = 'null';
              }
              return '<span class="' + cls + '">' + match + '</span>';
          });
        }
        return JSON.stringify(json, undefined, 2);
    };
  })
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
   
  }])
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
      
  }])
  .controller('CollectionCtrl', ['$rootScope', '$scope', 'Model', '$stateParams', function($rootScope, $scope, Model, $stateParams){
    
    $rootScope.collection = $stateParams.collection;
    $scope.data = [];

    Model.get({database: $rootScope.database, collection: $rootScope.collection}).$promise.then(function(data){
      $scope.data = data.data;
    });
      
  }]);

angular.module('app.services', ['ngResource'])
  .factory('Databases', ['$resource', function($resource){
    return $resource('/api/databases');
  }])
  .factory('Collections', ['$resource', function($resource){
    return $resource('/api/collections/:database', { database: '@database' });
  }])
  .factory('Model', ['$resource', function($resource){
    return $resource('/api/model/:database/:collection', { database: '@database', collection: '@collection' });
  }]);