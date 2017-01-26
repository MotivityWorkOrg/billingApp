'use strict';
function OrderCountDirective($log) {
    return {
        restrict: 'A',
        link: function (scope, ele) {
            $log.log('Coming in Order count directive');
            let homeController = scope.$parent.home;
            let selectedOrder = scope.orderItem;
            ele.bind("keyup", (event) => {
                if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 104) || (event.keyCode === 8 || event.keyCode === 127 )) {
                    let editedItemPrice = Number(selectedOrder.price);
                    let revisedItemOrderAmount;
                    if(parseInt(event.currentTarget.value) > 0){
                        revisedItemOrderAmount = editedItemPrice * (parseInt(event.currentTarget.value));
                    }
                    let oderTotalPrice = Math.round(revisedItemOrderAmount);
                    scope.$apply(() => {
                        homeController.orderPrice = Number(oderTotalPrice.toFixed(2));
                        homeController.itemInCart = false;
                    });
                }
            });
            ele.bind('focusout', function (event) {
                let revisedItemOrderAmount;
                let editedItemPrice = Number(selectedOrder.price);
                if(event.currentTarget.value === undefined || event.currentTarget.value === ''){
                    event.currentTarget.value = 1;
                    revisedItemOrderAmount = editedItemPrice * (parseInt(event.currentTarget.value));
                    let revisedAmount = Math.round(revisedItemOrderAmount);
                    scope.$apply(() => {
                        homeController.orderPrice = Number(revisedAmount.toFixed(2));
                        homeController.itemInCart = false;
                    });
                }
            });
        }
    };
}
OrderCountDirective.$inject = ['$log'];
export default OrderCountDirective;