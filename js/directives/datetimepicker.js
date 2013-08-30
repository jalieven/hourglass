var dateTimePickerDirective = angular.module('dateTimePicker', []);

dateTimePickerDirective.directive('dateTimePicker', function(){
    return {
        restrict: 'E',
        replace: true,
        require: '?ngModel', // the '?' means: if the required controller is not found,
        // Angular will throw an exception to tell you about the problem
        templateUrl: 'partial/datetimepicker.html',
        link: function(scope, element, attrs, ngModel){
            var input = element.find('input');

            element.datetimepicker({
                format: "yyyy/mm/dd hh:ii:ss",
                pickerPosition: 'bottom-left',
                autoclose: true,
                todayBtn: true
            });
            // $watch takes either a function or a string:
            // If it is a function then this function will get called on every loop of the
            // $digest and the return value from this function is taken
            // sas the value to compare against previous iterations.
            scope.$watch(ngModel, function(value){
                input.val(value);
            });

            element.bind('blur keyup change',  function() {
                ngModel.$setViewValue(input.val());
            });

        }
    }
});