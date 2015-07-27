'use strict';

angular.module('App', ['ui.router', 'ngMaterial', 'app.controllers', 'app.filters', 'app.services', 'templates'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    // For any unmatched url, redirect to homepage
    $urlRouterProvider.otherwise('/');

    // Homepage
    $stateProvider.state('homepage', {
      url: '/'
    });

    $stateProvider.state('database', {
      url: '/:database',
      templateUrl: 'database.html',
      controller: 'DatabaseCtrl'
    });

    $stateProvider.state('database.collection', {
      url: '/:collection',
      parent: 'database',
      templateUrl: 'collection.html',
      controller: 'CollectionCtrl'
    });

  }]);