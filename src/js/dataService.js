angular.module('phonebook')
.service('DataService', ['$http', '$q', 'config', function($http, $q, config) {

    this.fetchUsers = function() {
        var deferred = $q.defer();

        $http
            .get('http://' + config.apiHost + ':8080/api/users')
            .then(function(result) {
                deferred.resolve(result.data);
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

        return deferred.promise;
    };

    this.fetchCategory = function(category) {
        var deferred = $q.defer();

        $http
            .get('http://' + config.apiHost + ':8080/api/categories/' + category)
            .then(function(result) {
                deferred.resolve(result.data);
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

        return deferred.promise;
    };

}]);
