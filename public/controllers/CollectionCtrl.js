'use strict';

angular.module('app.controllers')
  .controller('CollectionCtrl', ['$rootScope', '$scope', 'Model', '$stateParams', '$mdDialog', '$mdSidenav', function($rootScope, $scope, Model, $stateParams, $mdDialog, $mdSidenav){
    
    $rootScope.collection = $stateParams.collection;
    $scope.data = [];

    // Make sure the sidebar is closed (for small screens)
    $mdSidenav('left').close();

    Model.get({database: $rootScope.database, collection: $rootScope.collection}).$promise.then(function(data){
      $scope.data = data.data;
    });

    $scope.showConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this entry?')
        .content('You will not be able to cancel it.')
        .ok('Delete')
        .cancel('Cancel')
        .targetEvent(ev);

      $mdDialog.show(confirm).then(function() {
        console.log('Delete the object ' + id);
      });
    };

    $scope.newEntry = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialogNewEntry.html',
        targetEvent: ev,
      })
      .then(function() {
        //$scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        //$scope.alert = 'You cancelled the dialog.';
      });
    };

    var DialogController = ['$scope', '$mdDialog', function($scope, $mdDialog) {
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.save = function() {
        $mdDialog.hide();
      };
    }];
      
  }]);