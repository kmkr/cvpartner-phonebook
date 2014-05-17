angular.module('phonebook')
.service('DataService', ['$http', '$q', function($http, $q) {

    this.fetchUsers = function() {
        var deferred = $q.defer();

        $http
            .get('https://localhost:8000/api/users')
            .then(function(result) {
                deferred.resolve(result.data);
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

        return deferred.promise;
    };

}]);
