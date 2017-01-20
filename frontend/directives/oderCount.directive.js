'use strict';
function OrderCountDirective($log) {
    return {
        restrict: 'A',
        link: function (scope, ele) {
            //$log.log(scope);
            let homeController = scope.$parent.home;
            let selectedOrder = scope.orderItem;
            ele.bind("keyup", (event) => {
                if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 104)) {
                    let editedItemPrice = Number(selectedOrder.price);
                    let revisedItemOrderAmount = editedItemPrice * (parseInt(event.key) - 1);
                    let oderTotalPrice = revisedItemOrderAmount + homeController.orderPrice;
                    homeController.orderPrice = homeController.orderPrice - editedItemPrice;
                    scope.$apply(() => {
                        homeController.orderPrice = oderTotalPrice;
                        homeController.itemInCart = false;
                    });
                }
            });
        }
    };
}
OrderCountDirective.$inject = ['$log'];
export default OrderCountDirective;