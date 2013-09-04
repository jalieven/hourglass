var dateTimePickerDirective = angular.module('dateTimePicker', []);

dateTimePickerDirective.directive('dateTimePicker', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            recipient: '='
        },
        template:
            '<div><input type="text" readonly data-date-format="yyyy-mm-dd hh:ii" name="recipientDateTime" data-date-time required></div>',
        link: function(scope, element, attrs, ngModel) {
            var input = element.find('input');
            if (input.val().length == 0) {
                input.val(scope.recipient);
            }
            input.datetimepicker({
                format: "yyyy/mm/dd hh:ii:ss",
                pickerPosition: 'bottom-left',
                autoclose: true,
                todayBtn: true
            });
            element.bind('blur keyup change', function(){
                scope.recipient = input.val();
            });
        }
    }
});