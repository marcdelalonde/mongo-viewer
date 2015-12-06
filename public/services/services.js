'use strict';

angular.module('app.services', ['ngResource'])
  .factory('Databases', ['$resource', function($resource){
    return $resource('/api/databases');
  }])
  .factory('Collections', ['$resource', function($resource){
    return $resource('/api/collections/:database', { database: '@database' });
  }])
  .factory('Model', ['$resource', function($resource){
    return $resource('/api/model/:database/:collection/:id', { database: '@database', collection: '@collection', id: '@id' }, {'update': { method:'PUT' }});
  }]);