'use strict';
function OrderCountDirective($log) {
    return {
        restrict: 'A',
        link: function (scope, ele) {
            //$log.log(scope);
            let homeController = scope.$parent.home;
            let selectedOrder = scope.orderItem;
            $log.log(homeController, '  :::  ', selectedOrder);
            ele.bind("keyup", (event) => {
                if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 104)) {
                    let editedItemPrice = Number(selectedOrder.price);
                    homeController.orderPrice = homeController.orderPrice - editedItemPrice;
                    scope.$apply(() => {
                        homeController.orderPrice = editedItemPrice * parseInt(event.key);
                        homeController.itemInCart = false;
                    });
                }
            });
        }
    };
}
OrderCountDirective.$inject = ['$log'];
export default OrderCountDirective;