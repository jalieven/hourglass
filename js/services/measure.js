var services = angular.module('measureServices', ['ngResource']);

services.factory('Measure', function($resource) {
    return $resource('https://api.mongolab.com/api/1/databases/hourglass/collections/measure/:id',
        { apiKey: 'FILL_ME', q: '@q' },
        {
            get: {method: 'GET'},
            update: { method: 'PUT' },
            query:  {method:'GET', isArray:true}
        }
    );
});

services.factory('MeasuresLoader', ['Measure', '$q', function(Measure, $q) {
    return function() {
        var delay = $q.defer();
        Measure.query(function(measures) {
            delay.resolve(measures);
        }, function() {
            delay.reject('Unable to fetch all measures!');
        });
        return delay.promise;
    };
}]);

services.factory('MeasureLoader', ['Measure', '$route', '$q', function(Measure, $route, $q) {
    return function() {
        var delay = $q.defer();
        Measure.get({id: $route.current.params.measureId}, function(measure) {
            delay.resolve(measure);
            delay.reject('Unable to fetch measure with id: ' + $route.current.params.measureId);
        });
        return delay.promise;
    };
}]);