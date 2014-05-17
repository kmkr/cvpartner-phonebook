angular.module('phonebook')
.service('DataService', ['$http', '$q', function($http, $q) {

    this.fetchUsers = function() {
        var deferred = $q.defer();

        $http
            .get('/api/users')
            .then(function(result) {
                deferred.resolve(result.data);
            }, function(error) {
                console.log(error);
            });

        return deferred.promise;
    };

}]);
