'use strict';
import $ from '../lib/jquery/dist/jquery.min';
window.jQuery = $;
window.$ = $;

function NumberOnlyDirective($log) {
    // this directive allows only numbers with decimal point.
    // You can specify the max decimal points using data-max-decimal-points in the dom element.
    // if data-max-decimal-points is not specified, it will allow up to any decimal point.
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, elem, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    let transformedInput = text.toString().replace(/[^0-9-]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }

            $(elem).on("keypress", function (event) {
                let value = event.currentTarget.value;
                if (event.charCode >= 48 && event.charCode <= 57 && value.length < parseInt(attr.maxLength)) {
                    ngModelCtrl.$parsers.push(fromUser);
                }
                else {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            });
        }
    };
}
NumberOnlyDirective.$inject = ['$log'];
export default NumberOnlyDirective;