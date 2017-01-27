'use strict';

function DiscountDirective($log) {
    return {
        restrict: 'A',
        link: function (scope, ele) {
            $log.log('In Discount Directive');
            let homeController = scope.home;
            let oldPrice = homeController.orderPrice;
            let totalOrderPrice = Number(homeController.orderPrice);
            ele.bind('click focus' , function () {
                oldPrice = homeController.orderPrice;
                totalOrderPrice = Number(homeController.orderPrice);
            });
            ele.bind("keyup", (event) => {
                if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 104) || (event.keyCode === 8 || event.keyCode === 127 )) {
                    //let oldPrice = homeController.orderPrice;
                    let discount = event.currentTarget.value !== "" ? parseInt(event.currentTarget.value) : 0.0;

                    let discountTotal = 0.0;
                    let revisedTotalPrice = 0.0;
                    if(discount > 0){
                        discountTotal = (discount * totalOrderPrice) / 100;
                        let afterDiscTotal = (totalOrderPrice - discountTotal);
                        revisedTotalPrice = Math.round(afterDiscTotal);
                    }
                    else {
                        revisedTotalPrice = oldPrice;
                    }
                    scope.$apply(() => {
                        homeController.orderPrice = revisedTotalPrice.toFixed(2);
                        homeController.itemInCart = false;
                    });
                }
            });
        }
    };
}

DiscountDirective.$inject = ['$log'];
export default DiscountDirective;