'use strict';

function DiscountDirective($log) {
    return {
        restrict: 'A',
        link: function (scope, ele) {
            $log.log('In Discount Directive');
            let homeController = scope.home;
            ele.bind("keyup", (event) => {
                if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 104) || (event.keyCode === 8 || event.keyCode === 127 )) {
                    let discount = event.currentTarget.value;
                    let discountTotal = 0.0;
                    let oderTotalPrice = 0.0;
                    if(event.currentTarget.value > 0){
                        discountTotal = (discount * Number(homeController.orderPrice)) / 100;
                        oderTotalPrice = homeController.orderPrice - discountTotal;
                        oderTotalPrice = Math.round(oderTotalPrice);
                        scope.$apply(() => {
                            homeController.orderPrice = oderTotalPrice.toFixed(2);
                            homeController.itemInCart = false;
                        });
                    }
                }
            });
        }
    };
}

DiscountDirective.$inject = ['$log'];
export default DiscountDirective;