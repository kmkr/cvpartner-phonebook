angular.module('phonebook')
.controller('CategoriesController', ['$scope', 'DataService', function($scope, DataService) {
	$scope.search = function () {
		DataService.fetchCategory($scope.searchText);
	};
}]);
