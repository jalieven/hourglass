var services = angular.module('hourglassServices', ['ngResource']);

services.factory('Hourglass', function($resource) {
    return $resource('https://api.mongolab.com/api/1/databases/hourglass/collections/hourglass/:id',
        { apiKey: 'FILL_ME', q: '@q' },
        {
            get: {method: 'GET'},
            update: { method: 'PUT' },
            query:  {method:'GET', isArray:true}
        }
    );
});

services.factory('HourglassesLoader', ['Hourglass', '$q', function(Hourglass, $q) {
    return function() {
        var delay = $q.defer();
        Hourglass.query(function(hourglasses) {
            delay.resolve(hourglasses);
        }, function() {
            delay.reject('Unable to fetch all hourglasses!');
        });
        return delay.promise;
    };
}]);

services.factory('HourglassLoader', ['Hourglass', '$route', '$q', function(Hourglass, $route, $q) {
    return function() {
        var delay = $q.defer();
        Hourglass.get({id: $route.current.params.hourglassId}, function(hourglass) {
            delay.resolve(hourglass);
            delay.reject('Unable to fetch hourglass with id: ' + $route.current.params.hourglassId);
        });
        return delay.promise;
    };
}]);