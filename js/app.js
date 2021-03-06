var hourglass = angular.module('hourglass', ['ngRoute', 'ngAnimate', 'hourglassServices', 'animPieChart', 'animBarChart', 'dateTimePicker']);

var controllers = {};

controllers.DashBoardController = function ($scope) {
    $scope.filterMeasure = {};
    $scope.filterMeasure.start = moment().format("YYYY/MM/DD HH:mm:ss");
    $scope.filterMeasure.end = moment().format("YYYY/MM/DD HH:mm:ss");
};

controllers.EditController = function ($scope) {

};

hourglass.controller(controllers);

hourglass.config(function ($routeProvider) {

    $routeProvider
        .when('/',
        {
            controller: 'DashBoardController',
            templateUrl: 'partial/dashboard.html',
            resolve: {
                events: function (HourglassesLoader) {
                    return HourglassesLoader();
                }
            }
        })
        .when('/hourglass/:hourglassId',
        {
            controller: 'EditController',
            templateUrl: 'partial/edit.html',
            resolve: {
                event: function (HourglassLoader) {
                    return HourglassLoader();
                }
            }
        })
        .otherwise({ redirectTo: '/'});
});