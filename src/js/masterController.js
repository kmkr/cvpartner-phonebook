angular.module('phonebook')
.controller('MasterController', ['$scope', 'DataService', function($scope, DataService) {

    $scope.model = {
        items: [],
        spinner: true
    };

    DataService.fetchUsers().then(function(data) {
        $scope.model.spinner = false;
        $scope.model.items = data;
    }, function(error) {
        $scope.error = error;
    });

}]);
